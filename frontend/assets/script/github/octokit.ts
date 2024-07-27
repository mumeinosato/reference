import { Octokit } from '@octokit/rest';
import { getToken } from './token';

const TOKEN = getToken();

const octokit = new Octokit({
    auth: TOKEN,
});

export async function getIssues() {
    const response = await octokit.rest.issues.listForRepo({
        owner: 'mumeinosato',
        repo: 'reference',
    });
    return response.data;
}

export async function createIssue(title: string, body: string, label:string){
    try{
        await octokit.rest.issues.create({
            owner: 'mumeinosato',
            repo: 'reference',
            title: title,
            body: body,
            labels: [label],
        });
        return true;
    }catch(e){
        return false;
    }
}