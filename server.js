import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import { clerkWebhooks } from './controllers/webhooks.js';

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// connect DB (safe for serverless)
let isConnected = false;
async function dbConnect() {
  if (isConnected) return;
  await connectDB();
  isConnected = true;
}
dbConnect();

// routes
app.get('/', (req, res) => {
  res.send('Server is running');
});

app.post('/clerk', clerkWebhooks);

export default app;
