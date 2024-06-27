import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConfigModule } from "@nestjs/config"

ConfigModule.forRoot();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const corsOptions: CorsOptions = {
    origin: process.env.FRONTEND_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: "Content-Type, Accept",
  };
  app.enableCors(corsOptions);
  await app.listen(3000, "0.0.0.0");
  
  console.log(`Listening on port ${process.env.FRONTEND_URL}`);
}
bootstrap();