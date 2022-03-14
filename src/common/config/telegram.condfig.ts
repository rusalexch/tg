import * as env from 'env-var';
import { ConfigType, registerAs } from '@nestjs/config';

export const telegramConfig = registerAs('telegram', () => {
  return {
    apiKey: env.get('TELEGRAMM_API_KEY').required().asString(),
  };
});

export const TELEGRAM_CONFIG_KEY = telegramConfig.KEY;

export type TelegramConfigType = ConfigType<typeof telegramConfig>;
