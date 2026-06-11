import express from 'express';

const app = express();
const port = 9000;

app.get('/ping', (_, res) => {
    res.send('pong');
});

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.info(`Server is running at http://localhost:${port}`);
});