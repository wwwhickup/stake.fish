import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import * as Configs from './config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HistoryModule } from './history/history.module';
import { ToolsModule } from './tools/tools.module';
import { APP_INTERCEPTOR, RouterModule } from '@nestjs/core';
import { IndexingModule } from './indexing/indexing.module';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggingInterceptor } from './logging.interceptor';
import { HealthModule } from './health/health.module';
import { configSchemaValidation } from './config/config.schema';

@Module({
  imports: [
    // initiate Prometheus metrics
    PrometheusModule.register(),
    // initiate nestjs config
    ConfigModule.forRoot({
      isGlobal: true,
      load: Object.values(Configs),
      envFilePath: '.env',
      validationSchema: configSchemaValidation,
    }),
    // MongoDB connect
    MongooseModule.forRoot(process.env.DATABASE_URI),
    HistoryModule,
    ToolsModule,
    IndexingModule,
    // Nested route
    RouterModule.register([
      {
        path: 'v1',
        module: IndexingModule,
        children: [
          {
            path: 'history',
            module: HistoryModule,
          },
          {
            path: 'tools',
            module: ToolsModule,
          },
        ],
      },
    ]),
    // Nestjs Terminus health check module
    HealthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
