import express from 'express';
// import cors from 'cors';

import { __port__, __prod__ } from './constants.js';
import connectDB from './config/db.js';
import router from './routes/pollRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import cookieParser from 'cookie-parser';
import setUserCookie from './middleware/authMiddleware.js';

connectDB();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(setUserCookie);
// app.use(cors());

app.use('/api', router);

app.get('/', (req, res) => {
  res.send('Settyl Polls Server is Ready');
  p;
});

app.use(notFound);
app.use(errorHandler);

app.listen(__port__, () => console.log(`Server running on port ${__port__}`));
