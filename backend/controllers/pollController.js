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
  const { question, options, isActive } = req.body;
  let poll = await Poll.findByIdOrSlug(req.params.id);
  if (!poll) {
    res.status(404);
    throw new Error(`Poll not found with id ${req.params.id}`);
  }

  if (typeof isActive === 'boolean') {
    poll.isActive = isActive;
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
      //add if no such option exists
      if (!existingOption) {
        poll.options.push({ optionText: option.optionText });
      }
    });
  }
  poll = await poll.save();
  res.status(200).json(poll);
});

// @desc  Vote a poll
// route  POST /api/polls/:id/vote
// access public
const votePoll = asyncHandler(async (req, res) => {
  const pollId = req.params.id;
  const { votedOption } = req.body;
  const userId = req.userId;
  const poll = await Poll.findByIdOrSlug(pollId);
  if (!poll) {
    res.status(400);
    throw new Error(`Poll not found with id ${pollId}`);
  }

  const existingVote = poll.votes.find(vote => vote.userId === userId);
  if (existingVote) {
    res.status(403);
    throw new Error('Looks like you already participated on this poll');
  }

  const option = await poll.options.find(
    option => option.optionText === votedOption
  );
  if (!option) {
    res.status(400);
    throw new Error('Invalid option');
  }

  option.votes += 1;

  poll.votes.push({
    userId,
    votedOption,
  });

  poll.totalVotes += 1;

  await poll.save();

  //format may change in future based on frontend Requirements
  const updatedVotingData = {
    id: poll._id,
    question: poll.question,
    options: poll.options.map(option => ({
      id: option._id,
      optionText: option.optionText,
      votes: option.votes,
    })),
    totalVotes: poll.totalVotes,
    isActive: poll.isActive,
    votes: { ...poll.votes },
  };

  res.status(200).json({
    message: `Congratulations! Your vote has been successfully registered for this poll.`,
    poll: updatedVotingData,
  });
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

export { createPoll, getPolls, getPoll, updatePoll, votePoll, deletePoll };
