import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import { clerkWebhooks } from './controllers/webhooks.js';

//initialize express
const app = express();

//connect to database
await connectDB()

//middlewares
app.use(cors())

// IMPORTANT: Add express.json() middleware globally to parse JSON
app.use(express.json());

//routes
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Webhook route - no need to pass express.json() here since it's applied globally
app.post('/clerk', clerkWebhooks); 

//port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});