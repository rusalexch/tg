import { Module } from '@nestjs/common';
import { AppLoggerModule } from './app-logger/app-logger.module';
import { ConfigModule } from '@nestjs/config';
import { config } from '../common/config';

@Module({
  imports: [AppLoggerModule, ConfigModule.forRoot(config)],
})
export class AppModule {}
