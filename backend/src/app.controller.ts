import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { ListService } from './list/list.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly listService: ListService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/list/:language/:type/:group')
  async getList(
    @Param('language') language: number,
    @Param('type') type: number,
    @Param('group') group: number,
  ): Promise<any> {
    return this.listService.List(language, type, group);
  }
}
