import { Module } from '@nestjs/common';
import { AppLoggerModule } from './app-logger/app-logger.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [AppLoggerModule, ConfigModule.forRoot()],
})
export class AppModule {}
