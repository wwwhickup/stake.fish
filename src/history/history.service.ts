import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { Dns, DnsDocument } from '../schema/dns.schema';

@Injectable()
export class HistoryService {
  // history limitation from env
  private readonly historyLimit: number;
  constructor(
    @InjectModel(Dns.name) private readonly DnsModel: Model<DnsDocument>,
    private readonly configService: ConfigService,
  ) {
    this.historyLimit = this.configService.get('app.historyLimit');
  }

  async getLatestHistories(): Promise<Dns[]> {
    // query for latest ${historylimit} history
    return this.DnsModel.find()
      .limit(this.historyLimit)
      .sort({ created_at: -1 })
      .select({ _id: 0, __v: 0 });
  }
}
