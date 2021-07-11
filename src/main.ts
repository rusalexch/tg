import { AppLoggerService } from './modules/app-logger/app-logger.service';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  const logger = new AppLoggerService();
  const app = await NestFactory.create(AppModule, {
    logger,
  });

  const port = process.env.PORT || 4000;
  await app.listen(port);
  logger.log(`Application was running on ${port} port`);
}
bootstrap();
