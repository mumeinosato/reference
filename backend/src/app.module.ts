import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ListService } from './reference/list/list.service';
import { DataService } from './reference/data/data.service';
import { ReferenceController } from './reference/reference.controller';
import { PostService } from './reference/post/post.service';
import { EditService } from './reference/edit/edit.service';
import { BoardController } from './board/board.controller';
import { BoardService } from './board/board.service';
import { UserController } from './user/user.controller';
import { LoginService } from './user/login/login.service';
import { ScriptController } from './script/script.controller';
import { RunService } from './script/run/run.service';
import { PostModule } from './reference/post/post.module';

@Module({
  imports: [HttpModule, PostModule],
  controllers: [
    AppController,
    ReferenceController,
    BoardController,
    UserController,
    ScriptController,
  ],
  providers: [
    AppService,
    ListService,
    DataService,
    PostService,
    EditService,
    BoardService,
    LoginService,
    RunService,
  ],
})
export class AppModule {}
