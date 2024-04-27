import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
//import { Redis } from 'ioredis';
import { config } from 'dotenv';

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

  async List(language: number, type: number, group: number): Promise<any> {
    const lang = parseInt(language.toString());
    const gr = parseInt(group.toString());
    const ty = parseInt(type.toString());

    //const cacheKey = `list_${lang}_${ty}_${gr}`;
    //const cacheData = await this.redis.get(cacheKey);

    /*if (cacheData) {
      return JSON.parse(cacheData);
    }*/

    let data;

    if (ty === 0) {
      data = await prisma.reference.findMany({
        where: {
          language: lang,
        },
        select: {
          id: true,
          title: true,
          list: true,
        },
      });
    } else if (ty === 1) {
      data = await prisma.techful.findMany({
        where: {
          language: lang,
          group: gr,
        },
        select: {
          id: true,
          title: true,
          list: true,
        },
      });
    } else if (ty === 2) {
      data = await prisma.aoj.findMany({
        select: {
          id: true,
          title: true,
          list: true,
        },
      });
    }

    //await this.redis.set(cacheKey, JSON.stringify(data));
    return data;
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
