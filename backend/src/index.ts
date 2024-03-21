import express from 'express';
import cors from 'cors';

import { Post } from './logic/post';

const app = express();
app.use(cors());

app.get('/', (req: express.Request, res: express.Response) => {
    res.send('It works!');
});

app.get('/post', (req: express.Request, res: express.Response) => {
    const { title, content, language, type, tag, group } = req.query;
    const status = Post(title, content, language, type, tag, group);
    res.send(status);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});