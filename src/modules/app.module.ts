import { Module } from '@nestjs/common';
import { AppLoggerModule } from './app-logger/app-logger.module';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';

@Module({
  imports: [AppLoggerModule, ConfigModule.forRoot()],
  controllers: [AppController],
})
export class AppModule {}
