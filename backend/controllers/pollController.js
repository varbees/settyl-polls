import asyncHandler from 'express-async-handler';
import Poll from '../models/pollsModel.js';

// @desc  Create a new poll
// route  POST /api/polls
// access public
const createPoll = asyncHandler(async (req, res) => {
  const { question, options } = req.body;
  const pollExists = await Poll.findOne({ question });
  if (pollExists) {
    res.status(400);
    throw new Error('Poll with that question already exists');
  }
  const poll = await Poll.create({
    question,
    options: options.map(option => ({
      optionText: option.optionText,
    })),
  });

  res.status(201).json(poll);
});

// @desc  Get all polls
// route  GET /api/polls/
// access public
const getPolls = asyncHandler(async (req, res) => {
  const polls = await Poll.find();
  if (!polls) {
    res.status(404);
    throw new Error('No Polls Found');
  }

  const totalPolls = await Poll.countDocuments();
  res.status(200).json({ totalPolls, polls });
});

// @desc  Get poll by id
// route  GET /api/polls/:id
// access public
const getPoll = asyncHandler(async (req, res) => {
  const poll = await Poll.findByIdOrSlug(req.params.id);
  if (!poll) {
    res.status(404);
    throw new Error(`Poll not found with id ${req.params.id}`);
  }
  res.status(200).json(poll);
});

// @desc  Update poll data by id
// route  PUT /api/polls/:id
// access public
const updatePoll = asyncHandler(async (req, res) => {
  const { question, options } = req.body;
  let poll = await Poll.findByIdOrSlug(req.params.id);
  if (!poll) {
    res.status(404);
    throw new Error(`Poll not found with id ${req.params.id}`);
  }

  if (question) {
    poll.question = question;
  }

  //tricky options update
  if (options && Array.isArray(options)) {
    //filter only common options
    poll.options = poll.options.filter(dbOption =>
      options.some(option => option.optionText === dbOption.optionText)
    );
    //add new options
    options.forEach(option => {
      //check if option exists
      const existingOption = poll.options.find(
        dbOption => dbOption.optionText === option.optionText
      );
      //add if not
      if (!existingOption) {
        poll.options.push({ optionText: option.optionText });
      }
    });
  }
  poll = await poll.save();
  res.status(200).json(poll);
});

// @desc  Delete poll by id
// route  DELETE /api/polls/:id
// access public
const deletePoll = asyncHandler(async (req, res) => {
  const deletePoll = await Poll.findByIdAndDelete(req.params.id);
  if (!deletePoll) {
    res.status(404);
    throw new Error(`Poll not found with id ${req.params.id}`);
  }
  res.status(200).json({ success: true });
});

export { createPoll, getPolls, getPoll, updatePoll, deletePoll };
