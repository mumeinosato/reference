import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function Post(title: string, content: string, language: number, type: number, group: string): Promise<boolean> {
    let status = 0;

    /*
    status
    0: success
    1: failed
    */

    /*
    type
    0: reference
    1: TechFul
    */

    if(type === 0) {
        try{
            const lang = parseInt(language.toString());
            await prisma.reference.create({
                data: {
                    title: title,
                    content: content,
                    language: lang,
                },
            });
            return true;
        }catch(e){
            return false;
        }
    }else if(type === 1) {
        try {
            const lang = parseInt(language.toString());
            const gr = parseInt(group.toString());
            await prisma.techful.create({
                data: {
                    title: title,
                    content: content,
                    language: lang,
                    group: gr,
                },
            });
            return true;
        }catch(e){
            return false;
        }
    }else{
        return false;
    }
}