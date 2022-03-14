import { Module } from '@nestjs/common';
import { AppLoggerModule } from '../app-logger/app-logger.module';
import { ConfigModule } from '@nestjs/config';
import {
  config,
  TELEGRAM_CONFIG_KEY,
  TelegramConfigType,
} from '../../common/config';
import { TelegrafModule } from 'nestjs-telegraf';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { AppUpdate } from './app.update';

@Module({
  imports: [
    AppLoggerModule,
    ConfigModule.forRoot(config),
    TelegrafModule.forRootAsync({
      inject: [TELEGRAM_CONFIG_KEY],
      useFactory: ({ apiKey }: TelegramConfigType) => ({
        token: apiKey,
      }),
    }),
  ],
  providers: [AppService, AppUpdate],
  exports: [AppService],
  controllers: [AppController],
})
export class AppModule {}
