import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { Dns } from '../../schema/dns.schema';
import { ToolsController } from '../tools.controller';
import { ToolsService } from '../tools.service';

describe('ToolsController', () => {
  let controller: ToolsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ToolsController],
      providers: [
        ToolsService,
        {
          provide: getModelToken(Dns.name),
          useValue: Model,
        },
      ],
    }).compile();

    controller = module.get<ToolsController>(ToolsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
