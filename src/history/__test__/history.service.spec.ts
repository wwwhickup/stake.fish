import { Test, TestingModule } from '@nestjs/testing';
import { HistoryService } from '../history.service';
import { Dns } from '../../schema/dns.schema';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

describe('HistoryService', () => {
  let service: HistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HistoryService,
        {
          provide: getModelToken(Dns.name),
          useValue: Model,
        },
      ],
    }).compile();

    service = module.get<HistoryService>(HistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
