import { Controller, Post, Get, Body } from '@nestjs/common';
import { BoardService } from './board.service';

@Controller('api/board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post('/bwrite')
  async write(
    @Body('name') name: string,
    @Body('user') user: string,
    @Body('content') content: string,
  ): Promise<boolean> {
    return this.boardService.b_Write(name, user, content);
  }

  @Get('/bread')
  async read(): Promise<any> {
    return this.boardService.b_Read();
  }
}
