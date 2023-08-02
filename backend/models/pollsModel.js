import mongoose from 'mongoose';
import slugify from 'slugify';

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
    unique: true,
    maxlength: [500, 'Question cannot be more than 500 characters'],
  },
  slug: String,
  options: [
    {
      optionText: {
        type: String,
        required: true,
        maxlength: [200, 'Option cannot be more than 200 characters'],
      },
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

PollSchema.pre('save', function (next) {
  this.slug = slugify(this.question, { lower: true });
  next();
});

PollSchema.statics.findByIdOrSlug = async function (idOrSlug) {
  if (mongoose.isValidObjectId(idOrSlug)) {
    return await this.findById(idOrSlug);
  } else {
    return await this.findOne({ slug: idOrSlug });
  }
};

const Poll = mongoose.model('Poll', PollSchema);

export default Poll;
