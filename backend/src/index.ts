import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { Post } from './logic/post';
import { Data } from './logic/data';
import { List } from './logic/list';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req: express.Request, res: express.Response) => {
    res.send('It works!');
});

app.post('/post', (req: express.Request, res: express.Response) => {
    const { title, content, language, type, group } = req.body;
    Post(title, content, parseInt(language), parseInt(type), group)
        .then((resp) => {
            res.send(resp);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('An error occurred');
        });
});

app.get('/data/:id/:type', (req: express.Request, res: express.Response) => {
    const { id, type } = req.params;
    Data(parseInt(id), parseInt(type))
        .then((resp) => {
            res.send(resp);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('An error occurred');
        });
});

app.get('/list/:language/:type/:group', (req: express.Request, res: express.Response) => {
    const { language, type, group } = req.params;
    List(parseInt(language), parseInt(type), parseInt(group))
        .then((resp) => {
            res.send(resp);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('An error occurred');
        });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});