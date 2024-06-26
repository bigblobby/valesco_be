import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import router from '@/routes';
import cookieParser from 'cookie-parser';
import errorLoggerHandler from '@/utils/errors/handlers/errorLoggerHandler';
import errorResponseHandler from '@/utils/errors/handlers/errorResponseHandler';
import morganMiddleware from '@/middlewares/morgan';

const app = express();

// Middleware
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cors({ origin: '*', credentials: true, }));
app.use(cors({ origin: 'http://localhost:3000', credentials: true, }));
// app.use(cors({ origin: 'http://192.168.1.193:3000', credentials: true, }));


// Logger
app.use(morganMiddleware);

// Routes
app.use(router);

// Error handlers
app.use(errorLoggerHandler);
app.use(errorResponseHandler);

export default app;