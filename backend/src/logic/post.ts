import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function Post(title: string, content: string, language: number, type: number, group: string): Promise<any> {
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

    try {
        if (type === 0) {
            const lang = parseInt(language.toString());
            const result = await prisma.reference.create({
                data: {
                    title: title,
                    content: content,
                    language: lang,
                },
            });
            console.log("Reference post created:", result);
            return true;
        } else if (type === 1) {
            const lang = parseInt(language.toString());
            const gr = parseInt(group.toString());
            const result = await prisma.techful.create({
                data: {
                    title: title,
                    content: content,
                    language: lang,
                    group: gr,
                },
            });
            console.log("TechFul post created:", result);
            return true;
        } else {
            console.error("Invalid post type:", type);
            return false;
        }
    } catch (e) {
        console.error("Error creating post:", e);
        return false;
    }
}