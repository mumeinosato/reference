import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function b_Write(name: string, user: string, content: string): Promise<boolean> {
    try {
        const data = await prisma.board.create({
            data: {
                displayname: name,
                user: user,
                content: content,
            },
        });
        return true;
    } catch (e) {
        console.error("Error writing data:", e);
        return false;
    }
} 

export async function b_Read(): Promise<any> {
    const data = await prisma.board.findMany({
        select: {
            displayname: true,
            content: true,
            createat: true,
        },
    });
    return data;
}