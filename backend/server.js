import express from 'express';
// import cors from 'cors';

import { __port__, __prod__ } from './constants.js';
import connectDB from './config/db.js';

connectDB();
const app = express();

app.use(express.json());
// app.use(cors());

app.get('/', (req, res) => {
  res.send('Settyl Polls Server is Ready');
  p;
});

app.listen(__port__, () => console.log(`Server running on port ${__port__}`));
