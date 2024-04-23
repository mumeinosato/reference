import { Injectable } from '@nestjs/common';
import * as fs from 'fs-extra';
import { HttpService } from '@nestjs/axios';
import { config } from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

import { s3Upload, s3Download } from '../minio';
import { DataService } from 'src/reference/data/data.service';

config();
const script_server_url =
  process.env.SCRIPT_SERVER_URL || 'http://localhost:5000';

@Injectable()
export class RunService {
  constructor(
    private readonly dataService: DataService,
    private httpService: HttpService,
  ) {}

  async runScript(id: number, input: string): Promise<any> {
    const data = await this.dataService.Data(id, 1);
    const content = data.content;
    const cont = content.replace(/<br>/g, '\n');
    const input_data = input.replace(/<br>/g, '\n');
    const language = parseInt(data.language.toString());
    const uuid = uuidv4();

    let code_path = '';
    let code_name = '';

    if (language === 1) {
      code_path = `temp/${uuid}.cpp`;
      code_name = `${uuid}.cpp`;
    } else if (language === 2) {
      code_path = `temp/${uuid}.py`;
      code_name = `${uuid}.py`;
    }

    const input_path = `temp/${uuid}.txt`;
    const input_name = `${uuid}.txt`;

    try {
      fs.writeFileSync(code_path, cont);
      await s3Upload(code_name);
      fs.writeFileSync(input_path, input_data);
      await s3Upload(input_name);
    } catch (e) {
      console.error('Error writing temp file:', e);
      fs.unlinkSync(code_path);
      fs.unlinkSync(input_path);
      return false;
    }

    let post = {};

    if (language === 1) {
      post = {
        code: code_name,
        language: 'cpp',
        input: input_name,
      };
    } else if (language === 2) {
      post = {
        code: code_name,
        language: 'python',
        input: input_name,
      };
    }

    let response = null;

    try {
      response = await this.httpService
        .post(`${script_server_url}/run`, post)
        .toPromise();
    } catch (e) {
      console.error('Error running script:', e);
      fs.unlinkSync(code_path);
      fs.unlinkSync(input_path);
      return false;
    }

    const out_path = `temp/output_${uuid}.txt`;
    const out_name = `output_${uuid}.txt`;

    if (response.data.success === true) {
      await s3Download(out_name);
      let output = '';
      try {
        output = fs.readFileSync(out_path, 'utf8');
        const out = output.replace(/\n/g, '<br>');

        fs.unlinkSync(code_path);
        fs.unlinkSync(input_path);
        fs.unlinkSync(out_path);
        return out;
      } catch (e) {
        console.error('Error reading output file:', e);
        fs.unlinkSync(code_path);
      }
    } else {
      return false;
    }
  }
}
