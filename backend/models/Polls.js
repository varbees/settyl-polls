import mongoose from 'mongoose';

const voteSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  votedOption: {
    type: String,
    required: true,
  },
});

const PollSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: [
    {
      optionText: { type: String, required: true },
      votes: { type: Number, default: 0 },
    },
  ],
  totalVotes: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  votes: [voteSchema],
});

module.exports = mongoose.model('Poll', PollSchema);
