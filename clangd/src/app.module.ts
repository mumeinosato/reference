import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClangdGateway } from './clangd/clangd.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ClangdGateway],
})
export class AppModule {}
