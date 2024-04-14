import { Prisma, PrismaClient } from "@prisma/client";
import { channel } from "diagnostics_channel";

const prisma = new PrismaClient();

export async function Edit(id: number, title: string, content: string, type: number): Promise<any> {
    const idn = parseInt(id.toString());
    try {
        if(type === 0){
            const data = await prisma.reference.update({
                where: {
                    id: idn,
                },
                data: {
                    title: title,
                    content: content,
                },
            });
            return true;
        }
        if(type === 1){
            const data = await prisma.techful.update({
                where: {
                    id: idn,
                },
                data: {
                    title: title,
                    content: content,
                },
            });
            return true;
        } else {
            console.error("Invalid type:", type);
            return false;
        }
    } catch (e) {
        console.error("Error updating data:", e);
        return false;
    }
}