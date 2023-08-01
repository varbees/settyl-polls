import { v4 as uuidv4 } from 'uuid';
import { __prod__ } from '../constants.js';

const setUserCookie = (req, res, next) => {
  if (!req.cookies?.userId) {
    const userId = uuidv4();
    res.cookie('userId', userId, {
      httpOnly: true,
      secure: __prod__,
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
  }
  next();
};

export default setUserCookie;
