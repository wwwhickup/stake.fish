import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { appVersion } from './app.dto';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * @Route /
   * @Method GET
   * @returns appVersion
   */
  @ApiOkResponse({ type: appVersion })
  @Get()
  getVersion(): appVersion {
    return this.appService.getVersion();
  }
}
