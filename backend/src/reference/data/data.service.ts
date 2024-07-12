import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class DataService {
  async Data(id: number, type: number): Promise<any> {
    const idn = parseInt(id.toString());
    const ty = parseInt(type.toString());

    let data;

    switch (ty) {
      case 0:
        data = await prisma.reference.findUnique({
          where: { id: idn },
          select: {
            title: true,
            content: true,
          },
        });
        break;
      case 1:
        data = await prisma.techful.findUnique({
          where: { id: idn },
          select: {
            title: true,
            content: true,
          },
        });
        break;
      case 2:
        data = await prisma.aoj.findUnique({
          where: { id: idn },
          select: {
            title: true,
            content: true,
          },
        });
        break;
      default:
        data = null;
        break;
    }

    return data;
  }
}
