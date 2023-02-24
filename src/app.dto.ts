import { IsString } from 'class-validator';
import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';

export class appVersion {
  @ApiResponseProperty({ type: String, example: '0.1.0' })
  version: string;

  @ApiResponseProperty({ type: Number, example: 1677240267241 })
  date: number;

  @ApiResponseProperty({ type: Boolean, example: true })
  kubernetes: boolean;
}

export class IpAddressesDTO {
  @ApiProperty({
    type: () => String,
    example: '127.0.0.1',
  })
  @IsString()
  ip: string;
}

export class LookUpResponseDTO {
  @ApiResponseProperty()
  addresses: IpAddressesDTO[];

  @ApiResponseProperty({ example: '127.0.0.1' })
  client_id: string;

  @ApiResponseProperty({ example: 98898703 })
  created_at: number;

  @ApiResponseProperty({ example: 'google.com' })
  domain: string;
}
export class IPv4ValidationDTO {
  @ApiResponseProperty({ example: true })
  status: boolean;
}

export class BadRequestExceptionSto {
  @ApiProperty({ type: () => Number, minimum: 0, default: 400 })
  status: number;

  @ApiProperty({
    type: () => String,
    minimum: 0,
    default: 'Bad Request',
  })
  message: string;
}

export class NotFoundExceptionSto {
  @ApiProperty({ type: () => Number, minimum: 0, default: 404 })
  status: number;

  @ApiProperty({
    type: () => String,
    minimum: 0,
    default: 'Not Found',
  })
  message: string;
}
