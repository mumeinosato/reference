import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { RunService } from './run.service';

@Module({
  imports: [HttpModule],
  providers: [RunService],
  exports: [RunService],
})
export class PostModule {}
