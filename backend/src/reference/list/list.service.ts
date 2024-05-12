import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
//import { Redis } from 'ioredis';
import { config } from 'dotenv';
import { List } from './list.models';

const prisma = new PrismaClient();
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

  async Edit_list(id: number, list: number, type: number): Promise<boolean> {
    const idn = parseInt(id.toString());
    const listn = parseInt(list.toString());
    const ty = parseInt(type.toString());

    try {
      if (ty === 0) {
        await prisma.reference.update({
          where: {
            id: idn,
          },
          data: {
            list: listn,
          },
        });
      } else if (ty === 1) {
        await prisma.techful.update({
          where: {
            id: idn,
          },
          data: {
            list: listn,
          },
        });
      } else if (ty === 2) {
        await prisma.aoj.update({
          where: {
            id: idn,
          },
          data: {
            list: listn,
          },
        });
      } else {
        return false;
      }

      //const cacheKey = `list_${idn}_${ty}_${listn}`;
      //await this.redis.del(cacheKey);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
