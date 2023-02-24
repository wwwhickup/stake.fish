import {
  Controller,
  Get,
  Post,
  Query,
  Ip,
  Body,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiProperty,
  ApiQuery,
} from '@nestjs/swagger';
import { ToolsService } from './tools.service';
import {
  IPv4ValidationDTO,
  IpAddressesDTO,
  NotFoundExceptionSto,
  BadRequestExceptionSto,
} from '../app.dto';
import { Dns } from '../schema/dns.schema';

@Controller()
export class ToolsController {
  constructor(private readonly toolsService: ToolsService) {}

  /**
   * @Route /v1/tools/lookup?domain=***
   * @Method GET
   * @param domainName: string
   * @param ip: string
   * @returns Dns
   */
  @ApiQuery({ name: 'domain', type: String })
  @ApiOkResponse({ type: Dns })
  @ApiBadRequestResponse({ type: BadRequestExceptionSto })
  @ApiNotFoundResponse({ type: NotFoundExceptionSto })
  @Get('lookup')
  async lookup(
    @Query('domain') domainName: string,
    @Ip() ip,
  ): Promise<Dns | BadRequestException | NotFoundException> {
    return this.toolsService.lookupDomain(domainName, ip);
  }

  /**
   * @Route /v1/tools/validate
   * @Method POST
   * @param input: IPv4ValidationDTO
   * @returns IPv4ValidationDTO
   */
  @Post('validate')
  @ApiProperty({ type: IpAddressesDTO })
  @ApiOkResponse({ type: IPv4ValidationDTO })
  @ApiBadRequestResponse({ type: BadRequestExceptionSto })
  validate(
    @Body() input: IpAddressesDTO,
  ): IPv4ValidationDTO | BadRequestException {
    return this.toolsService.isIPv4(input);
  }
}
