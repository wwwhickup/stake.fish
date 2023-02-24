import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiResponseProperty } from '@nestjs/swagger';
import { IpAddressesDTO } from '../app.dto';

export type DnsDocument = Dns & Document;

// dns lookup result schema
@Schema()
export class Dns {
  @Prop()
  @ApiResponseProperty({
    type: [IpAddressesDTO],
    example: [{ ip: '8.8.8.8' }, { ip: '114.14.114.114' }],
  })
  addresses: IpAddressesDTO[];

  @Prop()
  @ApiResponseProperty({ type: String, example: '127.0.0.1' })
  client_ip: string;

  @Prop()
  @ApiResponseProperty({ type: Number, example: 1677256433237 })
  created_at: number;

  @Prop()
  @ApiResponseProperty({ type: String, example: 'google.com' })
  domain: string;
}

export const DnsSchema = SchemaFactory.createForClass(Dns);
