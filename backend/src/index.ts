import express from 'express';
import cors from 'cors';

import { Post } from './logic/post';

const app = express();
app.use(cors());

app.get('/', (req: express.Request, res: express.Response) => {
    res.send('It works!');
});

app.get('/post/:title/:content/:language/:type/:tag/:group', (req: express.Request, res: express.Response) => {
    const status = Post(req.params.title, req.params.content, parseInt(req.params.language), parseInt(req.params.type), req.params.tag, req.params.group);
    res.send(status);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});