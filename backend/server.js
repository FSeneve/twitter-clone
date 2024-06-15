import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import connectDB from './db/connectDB.js';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;




app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use('/api/auth', authRoutes);


app.listen(PORT, ()=>{
    console.log(`Server is up and running on port: ${PORT}`);
    connectDB();
});