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
                list: true,
            },
        });
        return data;
    }
}

export async function Edit_list(id: number, list: number, type: number): Promise<boolean>{
    const idn = parseInt(id.toString());
    const listn = parseInt(list.toString());
    const ty = parseInt(type.toString());
    if (ty === 0){
        try {
            const data = await prisma.reference.update({
                where: {
                    id: idn,
                },
                data: {
                    list: listn,
                },
            });
            return true;
        } catch (e) {
            console.error("Error updating data:", e);
            return false;
        }
        return false;
    }else if (ty === 1){
        try {
            const data = await prisma.techful.update({
                where: {
                    id: idn,
                },
                data: {
                    list: listn,
                },
            });
            return true;
        } catch (e) {
            console.error("Error updating data:", e);
            return false;
        }
    }else{
        return false;
    }
}