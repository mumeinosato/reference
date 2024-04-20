import * as fs from 'fs-extra';

import { s3Upload, s3Download } from './index';
import { Data } from '../SQL/data';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { config } from 'dotenv';


config();
const script_server_url = process.env.SCRIPT_SERVER_URL || 'http://localhost:5000';

export async function run_script(id: number, input: string): Promise<any> {
    const data = await Data(id, 1);
    const content = data.content;
    const cont = content.replace(/<br>/g, '\n');
    const input_data = input.replace(/<br>/g, '\n');
    const language = parseInt(data.language.toString());
    const uuid = uuidv4();

    let code_path = '';
    let code_name = '';

    if (language === 1) {
        code_path = `src/cache/${uuid}.cpp`;
        code_name = `${uuid}.cpp`;
    } else if (language === 2) {
        code_path = `src/cache/${uuid}.py`;
        code_name = `${uuid}.py`;
    }
    const input_path = `src/cache/${uuid}.txt`;
    const input_name = `${uuid}.txt`;

    try {
        fs.writeFileSync(code_path, cont);
        await s3Upload(code_name);
        fs.writeFileSync(input_path, input_data);
        await s3Upload(input_name);
    } catch (e) {
        console.error("Error writing temp file:", e);
        return false;
    }

    let post = {};

    if (language === 1){
        post = {
            code: code_name,
            language: 'cpp',
            input: input_name,
        }
    }else if (language === 2){
        post = {
            code: code_name,
            language: 'python',
            input: input_name,
        } 
    }

    let response = {
        data: {
            success: false,
        }
    };

    try {
       response = await axios.post(`${script_server_url}/run`, post);
    } catch (e) {
        console.error("Error running script:", e);
        return false;
    }

    const out_path = `src/cache/output_${uuid}.txt`;
    const out_name = `output_${uuid}.txt`;

    if (response.data.success === true) {
        await s3Download(out_name);
        let output = '';
        try {
            output = fs.readFileSync(out_path, 'utf-8');
            const out = output.replace(/\n/g, '<br>');
            return out;
        } catch (e) {
            console.error("Error reading output file:", e);
            return false;
        }
    }else{
        return false;
    }

} 