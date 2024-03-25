import axios from 'axios';

const API_URL = 'http://127.0.0.1:3000';

export async function post(title: string, content: string, language: number, type: number, group: number): Promise<any> {
    const data = {
        title: title,
        content: content,
        language: language,
        type: type,
        group: group
    }
    const response = await axios.post(`${API_URL}/post`, data);
    return response.data;
}

export async function data(id: number, type: number): Promise<any> {
    const response = await axios.get(`${API_URL}/data/${id}/${type}`);
    return response.data;
}

export async function list(language: number,type: number ,group: number): Promise<any> {
    const response = await axios.get(`${API_URL}/list/${language}/${type}/${group}`);
    return response.data;
}

/*
https://localhost:3000/post/test/print(0)/2/1/2
*/