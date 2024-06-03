import * as fs from 'fs-extra';
import { HttpService } from '@nestjs/axios';
import { config } from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import { Buffer } from 'buffer';

import { s3Upload, s3Download } from '../minio';

config();
const script_server_url =
  process.env.SCRIPT_SERVER_URL || 'http://localhost:5000';

abstract class Run {
  input: string;
  code: string;
  luanguage: number;

  constructor(input: string, code: string, luanguage: number) {
    this.input = input;
    this.code = code;
    this.luanguage = luanguage;
  }

  abstract create(): Promise<any>;
}

class RunScript extends Run {
  private httpService: HttpService = new HttpService();

  constructor(input: string, code: string, luanguage: number) {
    super(input, code, luanguage);
  }

  async create(): Promise<any> {
    try {
      const inputcontent = Buffer.from(this.input, 'base64').toString();
      const content = Buffer.from(this.code, 'base64').toString();
      const language = parseInt(this.luanguage.toString());
      const uuid = uuidv4();

      let codeExtention = '';
      let codePath = '';

      switch (language) {
        case 1:
          codeExtention = 'cpp';
          codePath = `temp/${uuid}.${codeExtention}`;
          break;
        case 2:
          codeExtention = 'py';
          codePath = `temp/${uuid}.${codeExtention}`;
          break;
        default:
          throw new Error('Invalid language');
      }

      const inputPath = `temp/${uuid}.txt`;

      fs.writeFileSync(codePath, content);
      await s3Upload(`${uuid}.${codeExtention}`);
      fs.writeFileSync(inputPath, inputcontent);
      await s3Upload(`${uuid}.txt`);

      const post = {
        uuid: uuid,
        language: language === 1 ? 'cpp' : 'python',
      };

      const response = await this.httpService
        .post(`${script_server_url}/run`, post)
        .toPromise();

      if (response.data.success) {
        const outputName = `output_${uuid}.txt`;
        await s3Download(outputName);
        const output = fs.readFileSync(`temp/${outputName}`, 'utf-8');
        const outputBase64 = Buffer.from(output).toString('base64');
        fs.unlinkSync(codePath);
        fs.unlinkSync(inputPath);
        fs.unlinkSync(`temp/${outputName}`);
        return {
          output: outputBase64,
          success: true,
          time: response.data.time,
        };
      } else {
        fs.unlinkSync(codePath);
        fs.unlinkSync(inputPath);
        throw new Error(response.data.error);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export { Run, RunScript };
