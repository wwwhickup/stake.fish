import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { appVersion } from './app.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * @Route /
   * @Method GET
   * @returns appVersion
   */
  @ApiResponse({ type: appVersion })
  @Get()
  getVersion(): appVersion {
    return this.appService.getVersion();
  }
}
