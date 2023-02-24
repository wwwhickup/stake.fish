import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { isIPV4Address } from 'ip-address-validator';
import { Dns, DnsDocument } from '../schema/dns.schema';
import { IPv4ValidationDTO, IPv4InputDTO } from 'src/app.dto';
import dns2 = require('dns2');

// instantiate dns2
const dns = new dns2();

@Injectable()
export class ToolsService {
  constructor(
    @InjectModel(Dns.name) private readonly DnsModel: Model<DnsDocument>,
  ) {}

  /**
   * @param domainName string
   * @param ip string
   * @returns string[]
   */
  async lookupDomain(domainName: string, ip: string): Promise<string[]> {
    try {
      // lookup domain address
      const result = await dns.resolveA(domainName);
      const ipAddresses = result.answers.map((item) => item.address);

      // save result query
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

  /**
   * @param ipData string
   * @returns IPv4ValidationDTO
   */
  isIPv4(ipData: IPv4InputDTO): IPv4ValidationDTO {
    return {
      status: isIPV4Address(ipData.ip),
    };
  }
}
