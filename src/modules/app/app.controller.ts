import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('order')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':id')
  async test(@Param('id') id: string) {
    const order = await this.appService.getOrder(id);
    return { order };
  }
}
