import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getUserId(username: string): Promise<number> {
  const user = await prisma.user.findFirst({
    where: {
      username: username,
    },
    select: {
      id: true,
    },
  });
  return user.id;
}

@Injectable()
export class LoginService {
  async Login(user: string, pass: string): Promise<boolean> {
    const id = await getUserId(user);
    const password = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        password: true,
      },
    });
    if (password.password === pass) {
      return true;
    } else {
      return false;
    }
  }
}
