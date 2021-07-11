import { Module } from '@nestjs/common';
import { AppLoggerService } from './app-logger.service';

@Module({
  imports: [AppLoggerService],
  exports: [AppLoggerService],
})
export class AppLoggerModule {}
