import express from 'express';
import dotenv from 'dotenv';
import { pgDataSource } from './data-source.js';

dotenv.config();

try {
    await pgDataSource.initialize()
    console.log("Data Source has been initialized!")
} catch (error) {
    console.error("Error during Data Source initialization:", error)
}

const app = express();
app.use(express.json());
const port = 9000;

app.get('/ping', (_, res) => {
    res.send('pong');
});

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.info(`Server is running at http://localhost:${port}`);
});