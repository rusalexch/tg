import { Controller, Get } from '@nestjs/common';

@Controller('app')
export class AppController {
  @Get('test')
  async test() {
    return { data: 'TEST' };
  }
}
