import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class ListService {
  async List(language: number, type: number, group: number): Promise<any> {
    const lang = parseInt(language.toString());
    const gr = parseInt(group.toString());
    const ty = parseInt(type.toString());
    if (ty === 0) {
      const data = await prisma.reference.findMany({
        where: {
          language: lang,
        },
        select: {
          id: true,
          title: true,
          list: true,
        },
      });
      return data;
    } else if (ty === 1) {
      const data = await prisma.techful.findMany({
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
      return data;
    } else if (ty === 2) {
      const data = await prisma.aoj.findMany({
        select: {
          id: true,
          title: true,
          list: true,
        },
      });
      return data;
    }
  }

  async Edit_list(id: number, list: number, type: number): Promise<boolean> {
    const idn = parseInt(id.toString());
    const listn = parseInt(list.toString());
    const ty = parseInt(type.toString());
    if (ty === 0) {
      try {
        await prisma.reference.update({
          where: {
            id: idn,
          },
          data: {
            list: listn,
          },
        });
        return true;
      } catch (e) {
        console.error(e);
        return false;
      }
    } else if (ty === 1) {
      try {
        await prisma.techful.update({
          where: {
            id: idn,
          },
          data: {
            list: listn,
          },
        });
        return true;
      } catch (e) {
        console.error(e);
        return false;
      }
    } else if (ty === 2) {
      try {
        await prisma.aoj.update({
          where: {
            id: idn,
          },
          data: {
            list: listn,
          },
        });
        return true;
      } catch (e) {
        console.error(e);
        return false;
      }
    } else {
      return false;
    }
  }
}
