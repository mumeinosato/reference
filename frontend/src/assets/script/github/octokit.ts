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