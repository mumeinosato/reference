import Buffer from 'buffer';
import axios from 'axios';

const api_url = process.env.REACT_APP_BACKEND_URL

export const handleRunClick = (code, language, input) => {
    const codeData = Buffer.Buffer.from(code).toString('base64');
    const inputData = Buffer.Buffer.from(input).toString('base64');

    const data = {
        input: inputData,
        code: codeData,
        language: language,
    }

    return axios.post(`${api_url}/script/run`, data)
    .then(response => {
        return response.data;
    })
    .catch(error => {
        console.error('Error:', error);
        return false; 
    });
}