import { post } from './api';

export async function re_post(title: string, content: string, language: number): Promise<any> {
    return await post(title, content, language, 0, 0)
}

export async function te_post(title: string, content: string, language: number, group: number): Promise<boolean> {
    return await post(title, content, language, 1, group)
}