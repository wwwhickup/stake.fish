import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiResponseProperty } from '@nestjs/swagger';

export type DnsDocument = Dns & Document;

@Schema({ timestamps: true })
export class Dns {
  @Prop()
  @ApiResponseProperty({ type: String, example: 'google.com' })
  domainName: string;

  @Prop()
  @ApiResponseProperty({ type: [String], example: ['123.24.54.3', '7.27.4.9'] })
  ipAddresses: [string];

  @Prop()
  @ApiResponseProperty({ type: [String], example: '127.0.0.1' })
  clientIp: string;
}

export const DnsSchema = SchemaFactory.createForClass(Dns);
