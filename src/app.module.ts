import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConditionalModule, ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { DataSource } from 'typeorm';
import { config } from './config/typeorm';
import { PoiModule } from './poi/poi.module';

export const NODE_ENV = process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : '';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env${NODE_ENV}`,
    }),
    ConditionalModule.registerWhen(
      TypeOrmModule.forRootAsync({
        inject: [ConfigService],
        useFactory() {
          return config;
        },
        async dataSourceFactory(options) {
          if (!options) {
            throw new Error('Invalid options passed');
          }

          return addTransactionalDataSource(new DataSource(options));
        },
      }),
      (env) => env['NODE_ENV'] !== 'test',
    ),
    PoiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
