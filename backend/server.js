import express from 'express';
import cookieParser from 'cookie-parser';
import { Server } from 'socket.io';
import { __port__, __prod__ } from './constants.js';
import connectDB from './config/db.js';
import router from './routes/pollRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import setUserCookie from './middleware/authMiddleware.js';
import rateLimitMiddleware from './middleware/rateLimitMiddleware.js';

connectDB();
const app = express();

app.use(express.json());

app.use(cookieParser());
app.use(setUserCookie);

app.use(rateLimitMiddleware);

app.use('/api', router);

app.get('/', (req, res) => {
  res.send('Settyl Polls Server is Ready');
});

app.use(notFound);
app.use(errorHandler);

const server = app.listen(__port__, () =>
  console.log(`Server running on port ${__port__}`)
);

const io = new Server(server);

io.on('connection', socket => {
  console.log('User connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

export const socketIo = io;
