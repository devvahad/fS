import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';
import connectDB from './config/db.js';
import userRoute from './routes/userRoute.js';
import path from 'path';
import upload from './middlewares/UploadMiddleware.js';

const app = express();

dotenv.config();
connectDB();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Mount your routesif 
app.use('/api/users', userRoute);

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});