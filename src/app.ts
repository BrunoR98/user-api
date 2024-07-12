import express from 'express';
import * as dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware';
import swaggerDocs from './config/swagger';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);
app.use(errorHandlerMiddleware);
if (process.env.NODE_ENV === 'development') swaggerDocs(app);

export default app;
