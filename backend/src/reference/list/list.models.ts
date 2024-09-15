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
    protected lang: string,
    protected type: number,
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

    type TechDataItem = {
      title: string;
      dataIds?: number[]; // dataIds プロパティを追加
    };

    const langlist = {
      cpp: 'cpp',
      python: 'python',
      c: 'c',
      java: 'java',
      ruby: 'ruby',
      sql: 'sql',
    }[this.lang];

    const techData = await prisma.list.findMany({
      where: {
        type: this.type,
        [langlist]: { gt: 0 },
      },
      select: {
        title: true,
      },
    });

    for (const item of techData as TechDataItem[]) {
      const matchingData = await prisma.data.findMany({
        where: {
          title: item.title,
          language: this.lang,
        },
        select: {
          id: true,
        },
      });

      item.dataIds = matchingData.map((data) => data.id);
    }
    return techData;

    //await this.cacheData(cacheKey, result);
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
      const title = list[0][i].replace(/\[\.\]/g, ',');

      const al = await prisma.list.findMany({
        where: {
          title: title,
        },
        select: {
          id: true,
        },
      });

      if (al.length > 0) {
        await prisma.list.update({
          where: {
            id: al[0].id,
          },
          data: {
            list: i,
          },
        });
      } else {
        await prisma.list.create({
          data: {
            title: title,
            list: i,
            type: parseInt(list[1][i]),
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
