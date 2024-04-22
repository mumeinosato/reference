import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class DataService {
  async Data(id: number, type: number): Promise<any> {
    const idn = parseInt(id.toString());
    const ty = parseInt(type.toString());
    if (ty === 0) {
      const data = await prisma.reference.findUnique({
        where: {
          id: idn,
        },
        select: {
          title: true,
          content: true,
          language: true,
        },
      });
      return data;
    }
    if (ty === 1) {
      const data = await prisma.techful.findUnique({
        where: {
          id: idn,
        },
        select: {
          title: true,
          content: true,
          language: true,
        },
      });
      return data;
    }
    if (ty === 2) {
      const data = await prisma.aoj.findUnique({
        where: {
          id: idn,
        },
        select: {
          title: true,
          content: true,
        },
      });
      return data;
    }
  }
}
