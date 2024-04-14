import * as fs from 'fs-extra';

import { s3Upload } from './index';

export function uploade(content: string, language: number): Promise<boolean> {
    const cont = content.replace(/<br>/g, '\n');
    const lang = parseInt(language.toString());

    let path = '';

    if (lang === 0) {
        path = 'src/cache/temp.cpp';
    } else if (lang === 1) {
        path = 'src/cache/temp.py';
    }

    try {
        fs.writeFileSync(path, cont);
        s3Upload(path);
        return Promise.resolve(true);
    } catch (e) {
        console.error("Error writing temp file:", e);
        return Promise.resolve(false);
    }
} 