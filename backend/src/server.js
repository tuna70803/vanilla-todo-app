import express from 'express';
import cors from 'cors';
import { getIPs } from './utils/network.js';
import routes from './routes/index.js';

const PORT = 9002;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', routes);

const IPs = getIPs();
const addressInfo = IPs.map(ip => `  http://${ip}:${PORT}`).join('\n');
app.listen(PORT, () => console.log(`🚀 Server is Running at:\n${addressInfo}`));
