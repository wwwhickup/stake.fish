import { Injectable } from '@nestjs/common';
import { appVersion } from './app.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  private readonly appVersion: string;
  constructor(private readonly configService: ConfigService) {
    this.appVersion = this.configService.get('app.version');
  }
  getVersion(): appVersion {
    const res = {
      version: this.appVersion,
      date: new Date().getTime(),
      kubernetes: false,
    };
    return res;
  }
}
