import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { ListService } from './list/list.service';
import { DataService } from './data/data.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly listService: ListService,
    private readonly dataService: DataService,
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

  @Get('/data/:id/:type')
  async getData(
    @Param('id') id: number,
    @Param('type') type: number,
  ): Promise<any> {
    try {
      const data = await this.dataService.Data(id, type);
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
