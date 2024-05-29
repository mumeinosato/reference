import { Module } from '@nestjs/common';
import { ClangdGateway } from './clangd/clangd.gateway';

@Module({
  imports: [],
  controllers: [],
  providers: [ClangdGateway],
})
export class AppModule {}
