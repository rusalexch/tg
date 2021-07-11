import { AppLoggerService } from './modules/app-logger/app-logger.service';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { LoggerInterceptor } from './common/interceptors/logger.interceptor';

async function bootstrap() {
  const logger = new AppLoggerService();
  const app = await NestFactory.create(AppModule, {
    logger,
  });

  app.useGlobalInterceptors(new LoggerInterceptor(logger));

  const port = process.env.PORT || 4000;
  await app.listen(port);
  logger.log(`Application was running on ${port} port`);
}
bootstrap();
