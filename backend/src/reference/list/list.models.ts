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

abstract class Edit_list {
  constructor(
    protected id: number,
    protected list: number,
    protected type: number,
  ) {}

  abstract create(): Promise<boolean>;
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
