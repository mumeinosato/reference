import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ListService } from './list/list.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ListService],
})
export class AppModule {}
