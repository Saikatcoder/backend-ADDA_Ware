import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './db/db.js';
import connectCloudinary from './db/cloudnary.js';
import userRouter from './Route/userRoute.js';
import productRoute from './Route/productRoute.js';

const app = express();
dotenv.config();

connectDB();
connectCloudinary();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// ✅ Correct route registration
app.use('/api/v1/user', userRouter);
app.use('/api/v1/product',productRoute);
app.get('/', (req, res) => {
  res.send('cloth brand API');
});

app.listen(port, () => console.log(`Server started on port ${port}`));


