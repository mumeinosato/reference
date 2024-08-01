import { PrismaClient } from '@prisma/client';
//import { Redis } from 'ioredis';
import { config } from 'dotenv';
import { exportData } from './listdata';

config();

const prisma = new PrismaClient();
/*const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT),
});*/

abstract class List {
  constructor(
    protected lang: number,
    protected type: number,
    protected group: number,
  ) {}

  abstract create(): Promise<any>;

  /*protected async getCache(key: string): Promise<any> {
    const cache = await redis.get(key);
    if (cache) {
      return JSON.parse(cache);
    }
    return null;
  }

  protected async cacheData(key: string, data: any): Promise<void> {
    await redis.set(key, JSON.stringify(data));
  }*/
}

class TechFulList extends List {
  async create(): Promise<any> {
    /*const cacheKey = `techful_list:${this.lang}:${this.group}`;
    const cache = await this.getCache(cacheKey);
    if (cache) {
      return cache;
    }*/

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

    //await this.cacheData(cacheKey, result);
    return result;
  }
}

class AOJList extends List {
  async create(): Promise<any> {
    /*const cacheKey = 'aoj_list';
    const cache = await this.getCache(cacheKey);
    if (cache) {
      return cache;
    }*/

    const data = await prisma.aoj.findMany({
      select: {
        id: true,
        title: true,
        list: true,
      },
    });

    //await this.cacheData(cacheKey, data);
    return data;
  }
}

abstract class Edit_list {
  constructor(protected csv: string) {}

  abstract create(): Promise<boolean>;

  /*protected async clearCache(): Promise<void> {
    const cacheKeys = `*list`;
    const keys = await redis.keys(cacheKeys);
    if (keys.length > 0) {
      await redis.del(keys);
    }
  }*/
}

class TechFulList_edit extends Edit_list {
  async create(): Promise<boolean> {
    const list = exportData(this.csv);

    for (let i = 0; i < list[0].length; i++) {
      const al = await prisma.techful_list.findMany({
        where: {
          title: list[0][i],
        },
        select: {
          id: true,
        },
      });

      if (al.length > 0) {
        await prisma.techful_list.update({
          where: {
            id: al[0].id,
          },
          data: {
            list: i,
          },
        });
      } else {
        await prisma.techful_list.create({
          data: {
            title: list[0][i],
            list: i,
            group: parseInt(list[1][i]),
          },
        });
      }
    }
    await prisma.techful_list.deleteMany({
      where: {
        title: '',
      },
    });
    //await this.clearCache();
    return true;
  }
}

abstract class Unaffiliated_List {
  abstract create(): Promise<any>;
}

class TechFulList_Unaffiliated extends Unaffiliated_List {
  async create(): Promise<any> {
    interface List {
      title: string;
      group: number;
      language: number;
    }

    const techlist = await prisma.techful_list.findMany({
      select: {
        title: true,
        group: true,
      },
    });

    const techdata = await prisma.techful_data.findMany({
      select: {
        title: true,
        language: true,
      },
    });

    const result: List[] = [];

    for (let i = 0; i < techlist.length; i++) {
      const found = techdata.some((item) => item.title === techlist[i].title);

      if (techlist[i].group === 4 || techlist[i].group === 5) {
        continue;
      }

      if (found) {
        const languages = [];
        techdata.forEach((item) => {
          if (item.title === techlist[i].title) {
            languages.push(item.language);
          }
        });

        if (languages.length !== 2) {
          if (languages[0] === 1) {
            result.push({
              title: techlist[i].title,
              group: techlist[i].group,
              language: 2,
            });
          } else {
            result.push({
              title: techlist[i].title,
              group: techlist[i].group,
              language: 1,
            });
          }
        }
      } else {
        result.push({
          title: techlist[i].title,
          group: techlist[i].group,
          language: 1,
        });
        result.push({
          title: techlist[i].title,
          group: techlist[i].group,
          language: 2,
        });
      }
    }

    return result;
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
  Unaffiliated_List,
  TechFulList_Unaffiliated,
};
