import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

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

//idからユーザーのパスワードがnullか判定
//nullならfalseを返す

async function checkPassword(id: number): Promise<boolean> {
  const password = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      password: true,
    },
  });
  if (password.password === null) {
    return false;
  } else {
    return true;
  }
}

@Injectable()
export class LoginService {
  async Login(user: string, pass: string): Promise<number> {
    const id = await getUserId(user);
    const check = await checkPassword(id);
    if (check === false) {
      return 1;
    }
    const password = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        password: true,
      },
    });
    const match = await bcrypt.compare(pass, password.password);
    if (match === true) {
      return 0;
    } else {
      return 2;
    }
  }

  async setPassword(user: string, pass: string): Promise<number> {
    const id = await getUserId(user);
    const check = await checkPassword(id);
    if (check === true) {
      return 1;
    }
    const hash = await bcrypt.hash(pass, 10);
    await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        password: hash,
      },
    });
    return 0;
  }
}
