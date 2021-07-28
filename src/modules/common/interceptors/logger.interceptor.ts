import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AppLoggerService } from 'src/modules/app-logger/app-logger.service';
import { Request, Response } from 'express';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(private readonly logger: AppLoggerService) {}

  private formatRequest(req: Request) {
    return {
      url: req.url,
      path: req.path,
      method: req.method,
      headers: req.headers,
      body: req.body,
    };
  }

  private formatResponse(res: Response) {
    // console.log(res);

    return {
      status: res.statusCode,
      body: res.json,
    };
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const http = context.switchToHttp();
    const req = http.getRequest();
    const res = http.getResponse();

    if (req) {
      this.logger.log(this.formatRequest(req), 'Request');
    }

    if (res) {
      this.logger.log(this.formatResponse(res), 'Response');
    }

    return next.handle();
  }
}
