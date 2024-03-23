import axios from 'axios';

const API_URL = 'http://127.0.0.1:3000';

export async function post(title: string, content: string, language: number, type: number, group: number): Promise<boolean> {
    const response = await axios.get(`${API_URL}/post/${title}/${content}/${language}/${type}/${group}`);
    return response.data;
}

export async function size(language: number, type: number, group: number): Promise<number> {
    const response = await axios.get(`${API_URL}/size/${language}/${type}/${group}`);
    return response.data;
}

export async function data(language: number, type: number, group: number, num1: number): Promise<any> {
    const response = await axios.get(`${API_URL}/data/${language}/${type}/${group}/${num1}`);
    return response.data;
}

/*
https://localhost:3000/post/test/print(0)/2/1/2
*/