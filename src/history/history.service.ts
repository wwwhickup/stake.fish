import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Dns, DnsDocument } from '../schema/dns.schema';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HistoryService {
  private readonly historyLimit: number;
  constructor(
    @InjectModel(Dns.name) private readonly DnsModel: Model<DnsDocument>,
    private readonly configService: ConfigService,
  ) {
    this.historyLimit = this.configService.get('app.historyLimit');
  }
  async getLatestHistories(): Promise<Dns[]> {
    return this.DnsModel.find()
      .limit(this.historyLimit)
      .sort({ createdAt: -1 })
      .select({ createdAt: 0, updatedAt: 0, _id: 0, __v: 0 });
  }
}
