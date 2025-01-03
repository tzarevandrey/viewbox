import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function start() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const port = process.env.PORT || 5000;
  await app.listen(port, () => console.log(`server running on port ${port}`));
}
start();
