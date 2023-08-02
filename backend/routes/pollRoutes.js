import express from 'express';
import {
  createPoll,
  getPolls,
  getPoll,
  deletePoll,
  updatePoll,
  votePoll,
} from '../controllers/pollController.js';

const router = express.Router();

router.route('/polls').get(getPolls).post(createPoll);

router.route('/polls/:id').get(getPoll).put(updatePoll).delete(deletePoll);

router.post('/polls/:id/vote', votePoll);

export default router;
