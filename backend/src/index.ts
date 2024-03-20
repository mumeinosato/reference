import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/', (req: express.Request, res: express.Response) => {
    res.send('It works!');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});