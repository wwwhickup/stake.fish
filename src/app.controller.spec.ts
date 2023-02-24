import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configServiceMockFactory } from './config/mocks';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: ConfigService,
          useFactory: configServiceMockFactory,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('Should be defined', () => {
      expect(appController).toBeDefined();
    });
    it('Should be right version', () => {
      const res = appController.getVersion();
      expect(res.version).toBe('0.1.0');
    });
  });
});
