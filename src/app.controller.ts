import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): { data: string; message: string; code: number } {
    return {
      code: 0,
      data: this.appService.getHello(),
      message: '成功',
    };
  }
}
