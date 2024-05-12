import { Injectable } from '@nestjs/common';
//import { Redis } from 'ioredis';
import { config } from 'dotenv';
import { List, Edit_list } from './list.models';

config();
@Injectable()
export class ListService {
  //private redis: Redis;

  /*constructor() {
    this.redis = new Redis({
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT),
    });
  }*/

  async List(list: List): Promise<any> {
    try {
      await list.create();
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async Edit_list(list: Edit_list): Promise<boolean> {
    try {
      await list.create();
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}
