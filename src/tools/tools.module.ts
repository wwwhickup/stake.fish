import { Module } from '@nestjs/common';
import { ToolsService } from './tools.service';
import { ToolsController } from './tools.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Dns, DnsSchema } from '../schema/dns.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Dns.name, schema: DnsSchema }])],
  controllers: [ToolsController],
  providers: [ToolsService],
})
export class ToolsModule {}
