import express from 'express';
import cors from 'cors';

import { Post } from './logic/post';
import { Size } from './logic/size';
import { Data } from './logic/data';

const app = express();
app.use(cors());

app.get('/', (req: express.Request, res: express.Response) => {
    res.send('It works!');
});

app.get('/post/:title/:content/:language/:type/:group', (req: express.Request, res: express.Response) => {
    const { title, content, language, type, group } = req.params;
    Post(title, content, parseInt(language), parseInt(type), group)
        .then((resp) => {
            res.send(resp);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('An error occurred');
        });
});

app.get('/size/:language/:type/:group', (req: express.Request, res: express.Response) => {
    const { language, type, group } = req.params;
    Size(parseInt(language),parseInt(type), parseInt(group))
        .then((resp) => {
            res.send(resp.toString());
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('An error occurred');
        });
});

app.get('/data/:language/:type/:group/:num1', (req: express.Request, res: express.Response) => {
    const { language, type, group, num1, num2 } = req.params;
    Data(parseInt(language), parseInt(type), parseInt(group), parseInt(num1))
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