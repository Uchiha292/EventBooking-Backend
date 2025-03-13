import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import eventRoutes from './routes/eventRoutes.js';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use('/events', eventRoutes);

const dbURL = process.env.MONGOURL;
const port = process.env.PORT;

mongoose.connect(dbURL, {}).then(() => {
    console.log("Connection successful");
}).catch((error) => {
    console.error("Connection error", error);
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});