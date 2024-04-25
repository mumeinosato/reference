import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ListService } from 'src/reference/list/list.service';
import { DataService } from 'src/reference/data/data.service';
import { PostService } from 'src/reference/post/post.service';
import { EditService } from 'src/reference/edit/edit.service';

@Controller('api/reference')
export class ReferenceController {
  constructor(
    private readonly listService: ListService,
    private readonly dataService: DataService,
    private readonly postService: PostService,
    private readonly editService: EditService,
  ) {}

  @Get('/list/:language/:type/:group')
  async getList(
    @Param('language') language: number,
    @Param('type') type: number,
    @Param('group') group: number,
  ): Promise<any> {
    return this.listService.List(language, type, group);
  }

  @Post('/edit_list')
  async editList(
    @Body('id') id: number,
    @Body('list') list: number,
    @Body('type') type: number,
  ): Promise<boolean> {
    return this.listService.Edit_list(id, list, type);
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

  @Post('/post')
  async postData(
    @Body('title') title: string,
    @Body('content') content: string,
    @Body('language') language: number,
    @Body('type') type: number,
    @Body('group') group: string,
  ): Promise<any> {
    try {
      return this.postService.Post(title, content, language, type, group);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Post('/edit')
  async editData(
    @Body('id') id: number,
    @Body('title') title: string,
    @Body('content') content: string,
    @Body('type') type: number,
  ): Promise<any> {
    try {
      return this.editService.Edit(id, title, content, type);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
