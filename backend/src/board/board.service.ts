import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class BoardService {
  async b_Write(name: string, user: string, content: string): Promise<boolean> {
    try {
      await prisma.board.create({
        data: {
          displayname: name,
          user: user,
          content: content,
        },
      });
      return true;
    } catch (e) {
      console.error('Error writing data:', e);
      return false;
    }
  }

  async b_Read(): Promise<any> {
    const data = await prisma.board.findMany({
      select: {
        displayname: true,
        content: true,
        createat: true,
      },
    });
    return data;
  }
}
