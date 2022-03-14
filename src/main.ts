import { AppLoggerService } from './modules/app-logger/app-logger.service';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { LoggerInterceptor } from './common/interceptors/logger.interceptor';
import { AllExceptionsFilter } from './common/filters';

async function bootstrap() {
  const logger = new AppLoggerService();
  const app = await NestFactory.create(AppModule, {
    logger,
  });

  app.useGlobalInterceptors(new LoggerInterceptor(logger));
  app.useGlobalFilters(new AllExceptionsFilter(logger));

  const port = process.env.PORT || 4000;
  await app.listen(port);
  logger.log(`Application was running on ${port} port`);
}
bootstrap();
