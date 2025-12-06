import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json } from 'express';
import {
  initializeTransactionalContext,
  StorageDriver,
} from 'typeorm-transactional';
import { ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from '@algoan/nestjs-logging-interceptor';

async function bootstrap() {
  initializeTransactionalContext({ storageDriver: StorageDriver.AUTO });

  const app = await NestFactory.create(AppModule, {
    abortOnError: true,
    logger: ['debug'],
  });

  app.enableCors({
    origin: process.env.CORS_ORIGIN,
    methods: ['GET', 'OPTIONS', 'POST', 'PATCH', 'DELETE'],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.useGlobalInterceptors(new LoggingInterceptor());

  app.use(json({ limit: '80mb' }));

  const config = new DocumentBuilder()
    .setTitle('Bydgoszcz API')
    .setDescription('API')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
