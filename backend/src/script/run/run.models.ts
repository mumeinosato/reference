import * as fs from 'fs-extra';
import { HttpService } from '@nestjs/axios';
import { config } from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

import { s3Upload, s3Download } from '../minio';
import { DataService } from 'src/reference/data/data.service';

config();
const script_server_url =
  process.env.SCRIPT_SERVER_URL || 'http://localhost:5000';

abstract class Run {
  input: string;
  code?: string;
  id?: number;
  luanguage?: number;

  constructor(input: string) {
    this.input = input;
  }

  abstract create(): Promise<any>;
}

class SqlRun extends Run {
  id?: number;

  private readonly dataService: DataService = new DataService();
  private httpService: HttpService = new HttpService();

  constructor(id: number, input: string) {
    super(input);
    this.id = id;
  }

  async create(): Promise<any> {
    try {
      const data = await this.dataService.Data(this.id, 1);
      const content = data.content.replace(/<br>/g, '\n');
      const inputContent = this.input.replace(/<br>/g, '\n');
      const language = parseInt(data.language.toString());
      const uuid = uuidv4();

      let codeExtention = '';
      let codePath = '';

      if (language === 1) {
        codeExtention = 'cpp';
        codePath = `temp/${uuid}.${codeExtention}`;
      } else if (language === 2) {
        codeExtention = 'py';
        codePath = `temp/${uuid}.${codeExtention}`;
      } else {
        throw new Error('Invalid language');
      }

      const inputPath = `temp/${uuid}.txt`;

      fs.writeFileSync(codePath, content);
      await s3Upload(`${uuid}.${codeExtention}`);
      fs.writeFileSync(inputPath, inputContent);
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
        const output = fs
          .readFileSync(`temp/${outputName}`, 'utf-8')
          .replace(/\n/g, '<br>');
        fs.unlinkSync(codePath);
        fs.unlinkSync(inputPath);
        fs.unlinkSync(`temp/${outputName}`);
        return {
          output: output,
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

class CustomRun extends Run {
  code?: string;
  luanguage?: number;

  private httpService: HttpService = new HttpService();

  constructor(code: string, language: number, input: string) {
    super(input);
    this.code = code;
    this.luanguage = language;
  }

  async create(): Promise<any> {
    try {
      const content = this.code.replace(/<br>/g, '\n');
      const inputContent = this.input.replace(/<br>/g, '\n');
      const language = parseInt(this.luanguage.toString());
      const uuid = uuidv4();

      let codeExtention = '';
      let codePath = '';

      if (language === 1) {
        codeExtention = 'cpp';
        codePath = `temp/${uuid}.${codeExtention}`;
      } else if (language === 2) {
        codeExtention = 'py';
        codePath = `temp/${uuid}.${codeExtention}`;
      } else {
        throw new Error('Invalid language');
      }

      const inputPath = `temp/${uuid}.txt`;

      fs.writeFileSync(codePath, content);
      await s3Upload(`${uuid}.${codeExtention}`);
      fs.writeFileSync(inputPath, inputContent);
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
        const output = fs
          .readFileSync(`temp/${outputName}`, 'utf-8')
          .replace(/\n/g, '<br>');
        fs.unlinkSync(codePath);
        fs.unlinkSync(inputPath);
        fs.unlinkSync(`temp/${outputName}`);
        return {
          output: output,
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

export { Run, SqlRun, CustomRun };
