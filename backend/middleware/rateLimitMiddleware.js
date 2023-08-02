import rateLimit from 'express-rate-limit';
import { __prod__ } from '../constants.js';

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });

export default __prod__ ? limiter : (req, res, next) => next();
