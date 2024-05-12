import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

abstract class List {
  constructor(
    protected lang: number,
    protected type: number,
    protected group: number,
  ) {}

  abstract create(): Promise<any>;
}

class ReferenceList extends List {
  async create(): Promise<any> {
    return prisma.reference.findMany({
      where: {
        language: this.lang,
      },
      select: {
        id: true,
        title: true,
        list: true,
      },
    });
  }
}

class TechFulList extends List {
  async create(): Promise<any> {
    return prisma.techful.findMany({
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
  }
}

class AOJList extends List {
  async create(): Promise<any> {
    return prisma.aoj.findMany({
      select: {
        id: true,
        title: true,
        list: true,
      },
    });
  }
}

export { List, ReferenceList, TechFulList, AOJList };
