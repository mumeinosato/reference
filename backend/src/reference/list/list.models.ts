import { PrismaClient } from '@prisma/client';
import { Redis } from 'ioredis';
import { config } from 'dotenv';
import { exportData } from './listdata';

config();

const prisma = new PrismaClient();
const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT),
});

abstract class List {
  constructor(
    protected lang: number,
    protected type: number,
    protected group: number,
  ) {}

  abstract create(): Promise<any>;

  protected async getCache(key: string): Promise<any> {
    const cache = await redis.get(key);
    if (cache) {
      return JSON.parse(cache);
    }
    return null;
  }

  protected async cacheData(key: string, data: any): Promise<void> {
    await redis.set(key, JSON.stringify(data));
  }
}

class TechFulList extends List {
  async create(): Promise<any> {
    const cacheKey = `techful_list:${this.lang}:${this.group}`;
    const cache = await this.getCache(cacheKey);
    if (cache) {
      return cache;
    }

    const techData = await prisma.techful_data.findMany({
      where: {
        language: this.lang,
      },
      select: {
        id: true,
        title: true,
      },
    });

    const titleIdMap = new Map<string, number>();
    techData.forEach((item) => {
      titleIdMap.set(item.title, item.id);
    });

    const techListData = await prisma.techful_list.findMany({
      where: {
        group: this.group,
        title: {
          in: Array.from(titleIdMap.keys()),
        },
      },
      select: {
        title: true,
        group: true,
        list: true,
      },
    });

    const result = techListData
      .filter((item) => titleIdMap.has(item.title))
      .map((item) => ({
        id: titleIdMap.get(item.title),
        title: item.title,
        group: item.group,
        list: item.list,
      }));

    await this.cacheData(cacheKey, result);
    return result;
  }
}

class AOJList extends List {
  async create(): Promise<any> {
    const cacheKey = 'aoj_list';
    const cache = await this.getCache(cacheKey);
    if (cache) {
      return cache;
    }

    const data = await prisma.aoj.findMany({
      select: {
        id: true,
        title: true,
        list: true,
      },
    });

    await this.cacheData(cacheKey, data);
    return data;
  }
}

abstract class Edit_list {
  constructor(protected csv: string) {}

  abstract create(): Promise<boolean>;

  protected async clearCache(): Promise<void> {
    const cacheKeys = `*list`;
    const keys = await redis.keys(cacheKeys);
    if (keys.length > 0) {
      await redis.del(keys);
    }
  }
}

class TechFulList_edit extends Edit_list {
  async create(): Promise<boolean> {
    const list = exportData(this.csv);

    for (let i = 0; i < list.length; i++) {
      const data = list[i];

      const ed = await prisma.techful.findMany({
        where: {
          title: data,
        },
        select: {
          id: true,
        },
      });

      const ei = ed.map((item) => item.id);

      await prisma.techful.updateMany({
        where: {
          id: {
            in: ei,
          },
        },
        data: {
          list: i,
        },
      });
    }
    await this.clearCache();
    return true;
  }
}

/*class AOJList_edit extends Edit_list {
  async create(): Promise<boolean> {
    await prisma.aoj.update({
      where: {
        id: this.id,
      },
      data: {
        list: this.list,
      },
    });
    await this.clearCache();
    return true;
  }
}*/

export {
  List,
  TechFulList,
  AOJList,
  Edit_list,
  TechFulList_edit,
  //AOJList_edit,
};
