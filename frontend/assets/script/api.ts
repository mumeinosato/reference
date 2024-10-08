import axios from 'axios';
import { getApiUrl } from './api_url';


//const API_URL = 'http://localhost:3000';
const API_URL = getApiUrl();

export async function post(title: string, content: string, language: number, type: number, group: number): Promise<any> {
    const data = {
        title: title,
        content: content,
        language: language,
        type: type,
        group: group
    }
    const response = await axios.post(`${API_URL}/reference/post`, data);
    return response.data;
}

export async function data(id: number): Promise<any> {
    const data = {
        id: id
    }
    const response = await axios.post(`${API_URL}/reference/data`, data);
    return response.data;
}

export async function list(language: string, type:number): Promise<any> {
    const data = {
        language: language,
        type: type
    }
    const response = await axios.post(`${API_URL}/reference/list`, data);
    return response.data;
}

export async function edit_list(csv:string): Promise<boolean> {
    const data = {
        csv: csv
    }
    const response = await axios.post(`${API_URL}/reference/edit_list`, data);
    return response.data;
}

export async function edit(id: number, title: string, content: string, type: number): Promise<any> {
    const data = {
        id: id,
        title: title,
        content: content,
        type: type
    }
    const response = await axios.post(`${API_URL}/reference/edit`, data);
    return response.data;
}

export async function login(user: string, pass: string): Promise<number> {
    const data = {
        user: user,
        pass: pass
    }
    const response = await axios.post(`${API_URL}/user/login`, data);
    return response.data; 
}

export async function register(user: string, pass: string): Promise<number> {
    const data = {
        user: user,
        pass: pass
    }
    const response = await axios.post(`${API_URL}/user/register`, data);
    return response.data;
}

export async function bwrite(name: string, user: string, content: string): Promise<boolean> {
    const data = {
        name: name,
        user: user,
        content: content
    }
    const response = await axios.post(`${API_URL}/board/bwrite`, data);
    return response.data;
}

export async function bread(name: string): Promise<any> {
    const response = await axios.get(`${API_URL}/board/bread`);
    return response.data;
}

export async function run_script(input: string, code: string, language: number): Promise<any> {
    const data = {
        input: input,
        code: code,
        language: language
    }
    const response = await axios.post(`${API_URL}/script/run`, data);
    return response.data;
}

/*
https://localhost:3000/post/test/print(0)/2/1/2
*/