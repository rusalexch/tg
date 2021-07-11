import { Injectable } from '@nestjs/common';
import * as pino from 'pino';

@Injectable()
export class AppLoggerService {
  private logger: pino.Logger;
  constructor() {
    this.logger = pino({
      prettyPrint: true,
    });
  }
  log(message: any, context?: string) {
    this.logger.info(message, context);
  }
  error(message: any, trace?: string, context?: string) {
    // TODO: Добавить отправку сообщения об ошибки
    this.logger.error(message, context);
    if (trace) {
      this.logger.error(trace);
    }
  }
  warn(message: any, context?: string) {
    this.logger.warn(message, context);
  }
  debug?(message: any, context?: string) {
    this.logger.debug(message, context);
  }
  verbose?(message: any, context?: string) {
    this.logger.trace(message, context);
  }
}
