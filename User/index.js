import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use('/users', userRoutes);

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

let server = null;
if (process.env.NODE_ENV !== 'test') {
    server = app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

export { app, server };