import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv/config'
import cookieParser from 'cookie-parser';
import connectDB from './configs/db.js';
import userRouter from './routes/userRoute.js';
import sellerRouter from './routes/sellerRoute.js';


const app = express();
const PORT = process.env.PORT || 3000;
const allowedOrigins = ['http://localhost:5173/'];

// middleware configuration 
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server is running!');
});

// userRouter 
app.use('/api/v1/user', userRouter)
app.use('/api/v1/seller', sellerRouter)

app.listen(PORT, async () => {
    await connectDB()
    console.log(`Server is listening on port ${PORT}`)
});
