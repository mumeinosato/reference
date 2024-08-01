import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ListService } from 'src/reference/list/list.service';
import {
  TechFulList,
  AOJList,
  TechFulList_edit,
  TechFulList_Unaffiliated,
} from 'src/reference/list/list.models';
import { DataService } from 'src/reference/data/data.service';
import { PostService } from 'src/reference/post/post.service';
import { TechFulPost, AOJPost } from 'src/reference/post/post.models';
import { EditService } from 'src/reference/edit/edit.service';

@Controller('reference')
export class ReferenceController {
  constructor(
    private readonly listService: ListService,
    private readonly dataService: DataService,
    private readonly postService: PostService,
    private readonly editService: EditService,
  ) {}

  @Get('/list/:language/:type/:group')
  async getList(
    @Param('language') language: string,
    @Param('type') type: string,
    @Param('group') group: string,
  ): Promise<any> {
    try {
      const lang = parseInt(language);
      const ty = parseInt(type);
      const gr = parseInt(group);

      if (isNaN(lang) || isNaN(ty) || isNaN(gr)) {
        throw new Error('Invalid parameter');
      }

      let list;
      switch (ty) {
        case 1:
          list = new TechFulList(lang, ty, gr);
          break;
        case 2:
          list = new AOJList(lang, ty, gr);
          break;
        default:
          throw new Error('Invalid type');
      }
      const result = await list.create();
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Post('/edit_list')
  async editList(@Body('csv') csv: string): Promise<boolean> {
    try {
      const edit_list = new TechFulList_edit(csv);
      return this.listService.Edit_list(edit_list);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Get('/list_unaffiliated')
  async getUnaffiliatedList(): Promise<any> {
    try {
      const list = new TechFulList_Unaffiliated();
      return this.listService.Unaffiliated_list(list);
    } catch (error) {
      console.error(error);
      throw error;
    }
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
      let post;
      switch (type) {
        case 1:
          post = new TechFulPost(title, content, language, group);
          break;
        case 2:
          post = new AOJPost(title, content);
          break;
        default:
          throw new Error('Invalid type');
      }
      const result = await this.postService.Post(post);
      return result;
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
