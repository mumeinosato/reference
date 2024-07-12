import { PrismaClient } from '@prisma/client';
import { Redis } from 'ioredis';
import { config } from 'dotenv';

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

class ReferenceList extends List {
  async create(): Promise<any> {
    const cacheKey = 'reference_list:${this.lang}';
    const cache = await this.getCache(cacheKey);
    if (cache) {
      return cache;
    }

    const data = await prisma.reference.findMany({
      where: {
        language: this.lang,
      },
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

class TechFulList extends List {
  async create(): Promise<any> {
    const cacheKey = `techful_list:${this.lang}:${this.group}`;
    const cache = await this.getCache(cacheKey);
    if (cache) {
      return cache;
    }

    const data = await prisma.techful.findMany({
      where: {
        language: this.lang,
        group: this.group,
      },
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
  constructor(
    protected id: number,
    protected list: number,
    protected type: number,
  ) {}

  abstract create(): Promise<boolean>;

  protected async clearCache(): Promise<void> {
    const cacheKeys = `*list`;
    const keys = await redis.keys(cacheKeys);
    if (keys.length > 0) {
      await redis.del(keys);
    }
  }
}

class ReferenceList_edit extends Edit_list {
  async create(): Promise<boolean> {
    await prisma.reference.update({
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
}

class TechFulList_edit extends Edit_list {
  async create(): Promise<boolean> {
    await prisma.techful.update({
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
}

class AOJList_edit extends Edit_list {
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
}

export {
  List,
  ReferenceList,
  TechFulList,
  AOJList,
  Edit_list,
  ReferenceList_edit,
  TechFulList_edit,
  AOJList_edit,
};
