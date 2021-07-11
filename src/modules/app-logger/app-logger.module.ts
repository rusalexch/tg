import { Global, Module } from '@nestjs/common';
import { AppLoggerService } from './app-logger.service';

@Global()
@Module({
  imports: [AppLoggerService],
  exports: [AppLoggerService],
})
export class AppLoggerModule {}
