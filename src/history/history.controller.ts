import { Controller, Get } from '@nestjs/common';
import { HistoryService } from './history.service';
import { Dns } from '../schema/dns.schema';
import { ApiBadRequestResponse, ApiOkResponse } from '@nestjs/swagger';
import { BadRequestExceptionSto } from 'src/app.dto';

@Controller()
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  /**
   * @Route /v1/history
   * @Method GET
   * @returns Dns[]
   */
  @ApiOkResponse({
    type: [Dns],
    description: 'latest 20 lookup api call success results',
  })
  @ApiBadRequestResponse({ type: BadRequestExceptionSto })
  @Get()
  async getLatestHistories(): Promise<Dns[]> {
    return this.historyService.getLatestHistories();
  }
}
