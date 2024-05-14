import { Injectable } from '@nestjs/common';
import { Run } from './run.models';

@Injectable()
export class RunService {
  async run(run: Run): Promise<any> {
    try {
      await run.create();
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}
