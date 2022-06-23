import { registerAs } from '@nestjs/config';
import * as path from 'path';

const entityPath = path.join(__dirname, '../../dist/**/*.entity{.js,.ts}');

export default registerAs('database', () => ({
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  port: parseInt(process.env.TYPEORM_PORT),
  entities: [entityPath],
  synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
}));
