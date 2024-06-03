import { Controller, Body, Post } from '@nestjs/common';
import { RunService } from 'src/script/run/run.service';
import { RunScript } from './run/run.models';

@Controller('script')
export class ScriptController {
  constructor(private readonly runService: RunService) {}

  @Post('/run')
  async runList(
    @Body('input') input: string,
    @Body('code') code: string,
    @Body('language') language: number,
  ): Promise<any> {
    try {
      const Run = new RunScript(input, code, language);
      const result = await Run.create();
      return result;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
