import { Controller, Body, Post } from '@nestjs/common';
import { RunService } from 'src/script/run/run.service';
import { CustomRun, SqlRun } from './run/run.models';

@Controller('script')
export class ScriptController {
  constructor(private readonly runService: RunService) {}

  @Post('/run')
  async runList(
    @Body('id') id: number,
    @Body('input') input: string,
  ): Promise<any> {
    try {
      const sqlRun = new SqlRun(id, input);
      const result = await sqlRun.create();
      return result;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  @Post('/custom_run')
  async customRun(
    @Body('code') code: string,
    @Body('language') language: number,
    @Body('input') input: string,
  ): Promise<any> {
    try {
      const customRun = new CustomRun(code, language, input);
      const result = await this.runService.run(customRun);
      return result;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
