import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

abstract class Post {
  title: string;
  content: string;
  language?: number;
  group?: string;

  constructor(title: string, content: string) {
    this.title = title;
    this.content = content;
  }

  abstract create(): Promise<any>;
}

class ReferencePost extends Post {
  language?: number;

  constructor(title: string, content: string, language: number) {
    super(title, content);
    this.language = language;
  }

  async create(): Promise<any> {
    const result = await prisma.reference.create({
      data: {
        title: this.title,
        content: this.content,
        language: this.language,
      },
    });

    await prisma.reference.update({
      where: {
        id: result.id,
      },
      data: {
        list: result.id,
      },
    });

    console.log('Reference post created:', result);
    return true;
  }
}

class TechFulPost extends Post {
  language?: number;
  group?: string;

  constructor(title: string, content: string, language: number, group: string) {
    super(title, content);
    this.language = language;
    this.group = group;
  }

  async create(): Promise<any> {
    const result = await prisma.techful.create({
      data: {
        title: this.title,
        content: this.content,
        language: this.language,
        group: parseInt(this.group),
      },
    });

    await prisma.techful.update({
      where: {
        id: result.id,
      },
      data: {
        list: result.id,
      },
    });

    console.log('TechFul post created:', result);
    return true;
  }
}

class AOJPost extends Post {
  constructor(title: string, content: string) {
    super(title, content);
  }

  async create(): Promise<any> {
    const result = await prisma.aoj.create({
      data: {
        title: this.title,
        content: this.content,
      },
    });

    await prisma.aoj.update({
      where: {
        id: result.id,
      },
      data: {
        list: result.id,
      },
    });

    console.log('AOJ post created:', result);
    return true;
  }
}

export { Post, ReferencePost, TechFulPost, AOJPost };
