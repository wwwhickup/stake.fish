import { Controller, Get, Post, Query, Ip, Body } from '@nestjs/common';
import { ToolsService } from './tools.service';
import { IPv4ValidationDTO, IPv4InputDTO } from '../app.dto';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller()
export class ToolsController {
  constructor(private readonly toolsService: ToolsService) {}

  @ApiQuery({ name: 'domain', type: String })
  @ApiResponse({ type: [String], description: 'ip addresses of ddomain name' })
  @Get('lookup')
  async lookup(
    @Query('domain') domainName: string,
    @Ip() ip,
  ): Promise<string[]> {
    return this.toolsService.lookupDomain(domainName, ip);
  }

  @Post('validate')
  @ApiResponse({ type: IPv4ValidationDTO })
  validate(@Body() input: IPv4InputDTO): IPv4ValidationDTO {
    return this.toolsService.isIPv4(input);
  }
}