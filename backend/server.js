import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { __port__, __prod__ } from './constants.js';
import connectDB from './config/db.js';
import router from './routes/pollRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import setUserCookie from './middleware/authMiddleware.js';
import rateLimitMiddleware from './middleware/rateLimitMiddleware.js';

connectDB();
const app = express();
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

app.use(cors(corsOptions));
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

const server = http.createServer(app);

const io = new Server(server);

io.on('connection', socket => {
  console.log(`User connected: ${socket.id}`);

  socket.on('votingUpdate', data => io.emit('votingUpdated', data.updatedPoll));

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(__port__, () =>
  console.log(`Server running on port ${__port__}`)
);

export const socketIo = io;
