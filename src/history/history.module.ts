import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Dns, DnsSchema } from '../schema/dns.schema';

@Module({
  imports: [
    // initiate Mongoose Module
    MongooseModule.forFeature([{ name: Dns.name, schema: DnsSchema }]),
  ],
  controllers: [HistoryController],
  providers: [HistoryService],
})
export class HistoryModule {}
