import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { isIPV4Address } from 'ip-address-validator';
import { Dns, DnsDocument } from '../schema/dns.schema';
import { IPv4ValidationDTO, IPv4InputDTO } from 'src/app.dto';

import dns2 = require('dns2');

const dns = new dns2();

@Injectable()
export class ToolsService {
  constructor(
    @InjectModel(Dns.name) private readonly DnsModel: Model<DnsDocument>,
  ) {}
  async lookupDomain(domainName: string, ip: string): Promise<string[]> {
    try {
      const result = await dns.resolveA(domainName);
      const ipAddresses = result.answers.map((item) => item.address);
      const dnsData = new this.DnsModel({
        domainName,
        ipAddresses,
        clientIp: ip,
      });
      await dnsData.save();
      return ipAddresses;
    } catch (err) {
      console.log('error: ', err);
    }
  }

  isIPv4(ipData: IPv4InputDTO): IPv4ValidationDTO {
    return {
      status: isIPV4Address(ipData.ip),
    };
  }
}
