import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions, LoggerOptions } from 'typeorm';

dotenvConfig({ path: '.env' });

const logging: LoggerOptions = process.env.DATABASE_LOGGING_LEVEL
  ? (process.env.DATABASE_LOGGING_LEVEL.split(',') as LoggerOptions)
  : false;

export const config: DataSourceOptions = {
  type: 'postgres',
  port: parseInt(process.env.DATABASE_PORT || '5432', 10) || 5432,
  host: process.env.DATABASE_HOST || 'localhost',
  username: process.env.DATABASE_USERNAME || 'db',
  password: process.env.DATABASE_PASSWORD || 'db',
  database: process.env.DATABASE_NAME || 'db',
  schema: 'public',
  logging,
  uuidExtension: 'pgcrypto',
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
  migrationsRun: process.env.DATABASE_AUTO_RUN_MIGRATIONS === 'true',
};

export default registerAs('typeorm', () => config);

//Used by the typeorm CLI
export const dataSource = new DataSource(config);
