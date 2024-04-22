import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class EditService {
  async Edit(
    id: number,
    title: string,
    content: string,
    typ: number,
  ): Promise<boolean> {
    const idn = parseInt(id.toString());
    const type = parseInt(typ.toString());
    return prisma
      .$transaction(async (prismaClient) => {
        if (type === 0) {
          await prismaClient.reference.update({
            where: { id: idn },
            data: { title: title, content: content },
          });
        } else if (type === 1) {
          await prismaClient.techful.update({
            where: { id: idn },
            data: { title: title, content: content },
          });
        } else if (type === 2) {
          await prismaClient.aoj.update({
            where: { id: idn },
            data: { title: title, content: content },
          });
        } else {
          throw new Error('Invalid type');
        }
        return true;
      })
      .catch((error) => {
        console.error(error);
        return false;
      });
  }
}
