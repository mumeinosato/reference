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
    const response = await axios.post(`${API_URL}/post`, data);
    return response.data;
}

export async function data(id: number, type: number): Promise<any> {
    const response = await axios.get(`${API_URL}/data/${id}/${type}`);
    return response.data;
}

export async function list(language: number,type: number ,group: number): Promise<any> {
    const response = await axios.get(`${API_URL}/list/${language}/${type}/${group}`);
    console.log(`${API_URL}/list/${language}/${type}/${group}`);
    console.log(response.data);
    return response.data;
}

export async function edit_list(id: number, list: number, type: number): Promise<boolean> {
    const data = {
        id: id,
        list: list,
        type: type
    }
    const response = await axios.post(`${API_URL}/edit_list`, data);
    return response.data;
}

export async function edit(id: number, title: string, content: string, type: number): Promise<any> {
    const data = {
        id: id,
        title: title,
        content: content,
        type: type
    }
    const response = await axios.post(`${API_URL}/edit`, data);
    return response.data;
}

export async function login(user: string, pass: string): Promise<boolean> {
    const response = await axios.get(`${API_URL}/login/${user}/${pass}`);
    return response.data; 
}

export async function bwrite(name: string, user: string, content: string): Promise<boolean> {
    const data = {
        name: name,
        user: user,
        content: content
    }
    const response = await axios.post(`${API_URL}/bwrite`, data);
    return response.data;
}

export async function bread(name: string): Promise<any> {
    const response = await axios.get(`${API_URL}/bread/`);
    return response.data;
}

/*
https://localhost:3000/post/test/print(0)/2/1/2
*/