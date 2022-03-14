import * as env from 'env-var';
import { ConfigType, registerAs } from '@nestjs/config';

export const telegramConfig = registerAs('telegram', () => {
  return {
    apiKey: env.get('TELEGRAM_API_KEY').required().asString(),
    url: env.get('URL').required().asString(),
  };
});

export const TELEGRAM_CONFIG_KEY = telegramConfig.KEY;

export type TelegramConfigType = ConfigType<typeof telegramConfig>;
