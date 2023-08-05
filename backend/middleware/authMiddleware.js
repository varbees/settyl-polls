import { v4 as uuidv4 } from 'uuid';
import { __prod__ } from '../constants.js';

const setUserCookie = (req, res, next) => {
  if (!req.cookies?.userId) {
    const userId = uuidv4();
    res.cookie('userId', userId, {
      // httpOnly: false,
      secure: true,
      sameSite: 'None',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    req.userId = userId;
  } else {
    req.userId = req.cookies.userId;
  }
  next();
};

export default setUserCookie;
