import express from 'express';
import cors from 'cors';
import { getIPs } from './utils/network.js';

const PORT = 9002;

const app = express();
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.send('hello!');
});

const IPs = getIPs();
const addressInfo = IPs.map(ip => `  http://${ip}:${PORT}`).join('\n');
app.listen(PORT, () => console.log(`🚀 Server is Running at:\n${addressInfo}`));
