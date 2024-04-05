import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//usernameからidを取得し一番最初のidを返す
async function getUserId(username: string): Promise<number | null> {
    try {
        const foundUser = await prisma.user.findFirst({
            where: {
                username: {
                    equals: username, // 完全一致で調べる
                },
            },
            select: {
                id: true
            }
        });

        if (!foundUser) {
            return null; // ユーザーが見つからない場合は null を返します
        }

        return foundUser.id;
    } catch (error) {
        console.error('Error finding user:', error);
        throw error;
    }
}

export async function Login(user: string, pass: string): Promise<boolean> {
    const id = await getUserId(user);
    if (!id) {
        return false;
    }
    try {
        const password = await prisma.user.findUnique({
            where: {
                id: id,
            },
            select: {
                password: true,
            },
        });

        if (!password) {
            return false;
        }

        if (password.password === pass) {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        console.error("Error logging in:", e);
        return false;
    }
}