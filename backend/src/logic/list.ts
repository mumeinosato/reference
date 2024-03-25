import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function List(language: number, type: number, group: number): Promise<any> {
    const lang = parseInt(language.toString());
    const gr = parseInt(group.toString());
    const ty = parseInt(type.toString());
    if (ty === 0) {
        const data = await prisma.reference.findMany({
            where: {
                language: lang,
            },
            select: {
                id: true,
                title: true,
            },
        });
        return data;
    } else if (ty === 1) {
        const data = await prisma.techful.findMany({
            where: {
                language: lang,
                group: gr,
            },
            select: {
                id: true,
                title: true,
            },
        });
        return data;
    }
}