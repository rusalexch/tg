import { Module } from '@nestjs/common';
import { AppLoggerModule } from './app-logger/app-logger.module';
import { ConfigModule } from '@nestjs/config';
import {
  config,
  TELEGRAM_CONFIG_KEY,
  TelegramConfigType,
} from '../common/config';
import { TelegramModule } from 'nestjs-telegram';

@Module({
  imports: [
    AppLoggerModule,
    ConfigModule.forRoot(config),
    TelegramModule.forRootAsync({
      inject: [TELEGRAM_CONFIG_KEY],
      useFactory: ({ apiKey }: TelegramConfigType) => ({
        botKey: apiKey,
      }),
    }),
  ],
})
export class AppModule {}
