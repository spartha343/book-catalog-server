import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import routes from './app/routes';
import httpStatus from 'http-status';
import cookieParser from 'cookie-parser';
import globalErrorHandler from './app/middlewares/globalErrorHandler';

const app: Application = express();

//middlewares
app.use(
  cors({
    origin: 'https://catalog-book.netlify.app', // Your client-side origin
    credentials: true // Required for cookies to be sent
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Application routes
app.use('/api/v1', routes);

app.use(globalErrorHandler);

//handle not found route
app.use((req: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found'
      }
    ]
  });
});

// //testing
// app.get('/', (req: Request, res: Response) => {
//   res.send('Working successfully');
// });

export default app;
