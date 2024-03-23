import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function Size(language:number, type:number , group: number): Promise<number> {
    if(type === 0){
        const data = await prisma.reference.findMany({
            where: {
                language: language,
            },
        });
        return data.length;
    } else if (type === 1) {
        const data = await prisma.techful.findMany({
            where: {
                language: language,
                group: group, 
            },
        });
        return data.length;
    }
    return 0;
}