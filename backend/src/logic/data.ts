import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function Data(language: number, type: number, group: number, num1: number): Promise<any> {
    if(type === 0){
        //num1番目からnum2番目までのデータを取得
        //title contentを返す
        const lang = parseInt(language.toString());
        const data = await prisma.reference.findMany({
            where: {
                language: lang,
            },
            select: {
                title: true,
                content: true,
            },
            skip: (num1 - 1) * 50,
            take: 50,
        });
        return data;
    }
    if(type === 1){
        //num1番目からnum2番目までのデータを取得
        //title contentを返す
        const lang = parseInt(language.toString());
        const gr = parseInt(group.toString());
        const data = await prisma.techful.findMany({
            where: {
                language: lang,
                group: gr,
            },
            select: {
                title: true,
                content: true,
            },
            skip: (num1 - 1) * 50,
            take: 50,
        });
        return data;
    }
}