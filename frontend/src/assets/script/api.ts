import axios from 'axios';

const API_URL = 'http://127.0.0.1:3000';

export async function post(title: string, content: string, language: number, type: number, group: number): Promise<boolean> {
    console.log(`${API_URL}/post/${title}/${content}/${language}/${type}/${group}`);
    const response = await axios.get(`${API_URL}/post/${title}/${content}/${language}/${type}/${group}`);
    //res.send(status);
    return response.data;
}

/*
https://localhost:3000/post/test/print(0)/0/0/0
*/