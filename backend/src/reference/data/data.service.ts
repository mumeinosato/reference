import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
//import { Redis } from 'ioredis';
import { config } from 'dotenv';

config();

const prisma = new PrismaClient();
/*const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT),
});*/

@Injectable()
export class DataService {
  async Data(id: number): Promise<any> {
    const idn = parseInt(id.toString());
    /*const redisKey = `data:${ty}:${idn}`;

    const cache = await redis.get(redisKey);
    if (cache) {
      return JSON.parse(cache);
    }*/

    const data = await prisma.data.findUnique({
      where: { id: idn },
      select: {
        title: true,
        content: true,
        language: true,
      },
    });
    /*if (data) {
      await redis.set(redisKey, JSON.stringify(data));
    }*/

    return data;
  }
}
