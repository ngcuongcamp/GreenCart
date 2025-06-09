import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv/config'
import cookieParser from 'cookie-parser';
import connectDB from './configs/db.js';
import userRouter from './routes/userRoute.js';
import sellerRouter from './routes/sellerRoute.js';
import productRouter from './routes/productRoute.js';
import connectCloudinary from './configs/cloudinary.js';
import cartRouter from './routes/cartRoute.js';
import addressRouter from './routes/addressRoute.js';


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
app.use('/api/v1/products', productRouter)
app.use('/api/v1/cart', cartRouter)
app.use('api/v1/address', addressRouter)

app.listen(PORT, async () => {
    await connectDB()
    await connectCloudinary()
    console.log(`Server is listening on port ${PORT}`)
});
