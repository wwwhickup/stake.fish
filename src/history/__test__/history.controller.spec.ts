import { Test, TestingModule } from '@nestjs/testing';
import { HistoryController } from '../history.controller';
import { HistoryService } from '../history.service';
import { Dns } from '../../schema/dns.schema';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

describe('HistoryController', () => {
  let controller: HistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistoryController],
      providers: [
        HistoryService,
        {
          provide: getModelToken(Dns.name),
          useValue: Model,
        },
      ],
    }).compile();

    controller = module.get<HistoryController>(HistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
