import { post } from './api';

export async function re_post(title: string, content: string, language: number, tag: string): Promise<boolean> {
    return await post(title, content, language, 0, tag, 0)
}