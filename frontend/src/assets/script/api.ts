import axios from 'axios';

const API_URL = 'http://localhost:3000/';

export async function post(title: string, content: string, language: number, type: number, tag: string, group: number): Promise<boolean> {
    const response = await axios.get(`${API_URL}/post/${title}/${content}/${language}/${type}/${tag}/${group}`);
    //res.send(status);
    if(response.data === 0){
        return true;
    } else {
        return false;
    }
}