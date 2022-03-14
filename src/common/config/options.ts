import { ConfigModuleOptions } from '@nestjs/config/dist/interfaces';
import { telegramConfig } from './telegram.condfig';

export const config: ConfigModuleOptions = {
  isGlobal: true,
  load: [telegramConfig],
};
