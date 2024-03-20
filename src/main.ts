import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(8001);
  console.log(`Application is running on: http://localhost:8001/admin`);
}
bootstrap();
