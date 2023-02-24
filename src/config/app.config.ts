import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3000,
  baseUrl: process.env.BASE_URL || 'http://localhost:3000',
  version: process.env.APP_VERSION || '0.1.0',
  historyLimit: process.env.APP_HISTORY_LIMIT || 20,
}));
