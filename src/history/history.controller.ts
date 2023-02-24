import { Controller, Get } from '@nestjs/common';
import { HistoryService } from './history.service';
import { Dns } from '../schema/dns.schema';
import { ApiResponse } from '@nestjs/swagger';

@Controller()
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @ApiResponse({
    type: [Dns],
    description: 'latest 20 lookup api call success results',
  })
  @Get()
  async getLatestHistories(): Promise<Dns[]> {
    return this.historyService.getLatestHistories();
  }
}
