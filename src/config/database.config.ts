import { registerAs } from '@nestjs/config';

// APP Database config
export default registerAs('database', () => ({
  url: process.env.DATABASE_URI,
}));
