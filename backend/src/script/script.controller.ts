import { Controller, Body, Post } from '@nestjs/common';
import { RunService } from 'src/script/run/run.service';

@Controller('script')
export class ScriptController {
  constructor(private readonly runService: RunService) {}

  @Post('/run')
  async runList(
    @Body('id') id: number,
    @Body('input') input: string,
  ): Promise<any> {
    return this.runService.runScript(id, input);
  }
}
