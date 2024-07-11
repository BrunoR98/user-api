import express from 'express';
import * as dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/users', userRoutes);
app.use(errorHandlerMiddleware);

export default app;
