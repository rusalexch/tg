import {
  Catch,
  ArgumentsHost,
  HttpServer,
  HttpException,
} from '@nestjs/common';
import express from 'express';
import { BaseExceptionFilter } from '@nestjs/core';
import { AppLoggerService } from 'src/modules/app-logger/app-logger.service';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  logger: AppLoggerService;
  constructor(logger: AppLoggerService, applicationRef?: HttpServer<any, any>) {
    super(applicationRef);
    this.logger = logger;
  }
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<express.Response>();
    const request = ctx.getRequest<express.Request>();
    if (!request) {
      return;
    }

    this.logger.error(exception, undefined, 'Exception Handled');

    if (exception instanceof HttpException) {
      const status = exception.getStatus();

      response.status(status).json(exception.getResponse());
    } else if (exception instanceof Error) {
      const { name, message } = exception;
      response.status(500).json({
        name,
        message,
      });
    } else {
      response.status(500).json({
        error: 'Unknown error',
      });
    }
  }
}
