import express from 'express';
import cors from 'cors';

const PORT = 9002;

const app = express();
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.send('hello!');
});

app.listen(PORT, () => console.log(`🚀 Listening on port ${PORT} ⭐️`));
