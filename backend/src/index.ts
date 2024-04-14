import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { Post } from './logic/SQL/post';
import { Edit } from './logic/SQL/edit';
import { Data } from './logic/SQL/data';
import { List, Edit_list } from './logic/SQL/list';
import { Login } from './logic/SQL/login';
import { b_Write, b_Read } from './logic/SQL/board';


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

app.post('/bwrite', (req: express.Request, res: express.Response) => {
    const { name, user, content } = req.body;
    b_Write(name, user, content)
        .then((resp) => {
            res.send(resp);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('An error occurred');
        });
});

app.get('/bread', (req: express.Request, res: express.Response) => {
    b_Read()
        .then((resp) => {
            res.send(resp);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('An error occurred');
        });
});

app.post('/edit', (req: express.Request, res: express.Response) => {
    const { id, title, content, type } = req.body;
    Edit(parseInt(id), title, content, parseInt(type))
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

app.post('/edit_list', (req: express.Request, res: express.Response) => {
    const { id, list, type } = req.body;
    Edit_list(parseInt(id), parseInt(list), parseInt(type))
        .then((resp) => {
            res.send(resp);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('An error occurred');
        });
});

app.get('/login/:user/:pass', (req: express.Request, res: express.Response) => {
    const { user, pass } = req.params;
    Login(user, pass)
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