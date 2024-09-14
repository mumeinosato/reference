import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Redis } from 'ioredis';
import { config } from 'dotenv';

config();

const prisma = new PrismaClient();
const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT),
});

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
        if (type === 1) {
          await prismaClient.techful_data.update({
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

        const redisKey = `data:${type}:${idn}`;
        await redis.del(redisKey);

        return true;
      })
      .catch((error) => {
        console.error(error);
        return false;
      });
  }
}
