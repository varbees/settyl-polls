import express from 'express';
import {
  createPoll,
  getPolls,
  getPoll,
  deletePoll,
  updatePoll,
} from '../controllers/pollController.js';

const router = express.Router();

router.route('/polls').get(getPolls).post(createPoll);

router.route('/polls/:id').get(getPoll).put(updatePoll).delete(deletePoll);

export default router;
