import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { isIPV4Address } from 'ip-address-validator';
import { Dns, DnsDocument } from '../schema/dns.schema';
import { IPv4ValidationDTO, IpAddressesDTO } from 'src/app.dto';
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
   * @returns Dns
   */
  async lookupDomain(
    domainName: string,
    ip: string,
  ): Promise<Dns | NotFoundException | BadRequestException> {
    try {
      // verify domain name
      const domainRegx =
        /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/g;
      if (!domainName.match(domainRegx)) {
        return new BadRequestException(`${domainName} is not a valid domain`);
      }
      // lookup domain address
      const result = await dns.resolveA(domainName);
      const ipAddresses = result.answers.map((item) => ({ ip: item.address }));
      if (result.answers.length) {
        const newDns = {
          addresses: ipAddresses,
          client_ip: ip,
          created_at: new Date().getTime(),
          domain: domainName,
        };
        // save result query
        const neDnsModel = new this.DnsModel({ ...newDns });
        await neDnsModel.save();
        return newDns;
      }
      return new NotFoundException(`Not found ${domainName}`);
    } catch (err) {
      console.log('error: ', err);
    }
  }

  /**
   * @param ipData string
   * @returns IPv4ValidationDTO
   */
  isIPv4(ipData: IpAddressesDTO): IPv4ValidationDTO | BadRequestException {
    if (isIPV4Address(ipData.ip)) {
      return {
        status: isIPV4Address(ipData.ip),
      };
    }
    return new BadRequestException(`${ipData.ip} Is not a valid Ip address`);
  }
}
