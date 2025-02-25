import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDb from './config/db.js';
import router from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import restaurantRouter from './routes/restaurantRoute.js';
import categoryRouter from './routes/categoryRoute.js';
import foodRouter from './routes/foodRoute.js';

dotenv.config(); // Correct way to load environment variables

const app = express();
connectDb();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

app.use('/api/auth', router)
app.use('/api/user', userRouter)
app.use('/api/restaurant', restaurantRouter)
app.use('/api/category', categoryRouter)
app.use('/api/food', foodRouter)
// Routes
app.get('/', (req, res) => {
    res.status(200).send('API working');
});


app.listen(3000, () => {
    console.log(`Server is running on port `);
});
