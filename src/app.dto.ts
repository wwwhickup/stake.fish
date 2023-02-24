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

export class IPv4ValidationDTO {
  @ApiResponseProperty({ example: true })
  status: boolean;
}

export class IPv4InputDTO {
  @ApiProperty({ example: '127.0.0.1', description: 'IPv4 address' })
  @IsString()
  readonly ip: string;
}
