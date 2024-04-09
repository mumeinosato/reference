import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function Data(id: number, type: number): Promise<any> {
    const idn = parseInt(id.toString());
    if(type === 0){
        const data = await prisma.reference.findUnique({
            where: {
                id: idn,
            },
            select: {
                title: true,
                content: true,
                language: true,
            },
        });
        return data;
    }
    if(type === 1){
        const data = await prisma.techful.findUnique({
            where: {
                id: idn,
            },
            select: {
                title: true,
                content: true,
            },
        });
        return data;
    }
    if(type === 2){
        const data = await prisma.aoj.findUnique({
            where: {
                id: idn,
            },
            select: {
                title: true,
                content: true,
            },
        });
        return data;
    }
}