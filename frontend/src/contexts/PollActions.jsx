import axios from 'axios';

const URL = 'http://localhost:8005/api';
const settylAPI = axios.create({
  baseURL: URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

export const getPolls = async () => {
  try {
    const res = await settylAPI.get('/polls');
    return res.data.polls;
  } catch (err) {
    throw new Error(`Error fetching polls: ${err?.message}`);
  }
};

export const getPoll = async id => {
  try {
    const res = await settylAPI.get(`/polls/${id}`);
    return res.data;
  } catch (err) {
    throw new Error(`Error fetching poll with ID ${id}: ${err?.message}`);
  }
};

export const votePoll = async (id, votedOption) => {
  try {
    const res = await settylAPI.post(`/polls/${id}/vote`, {
      votedOption: votedOption,
    });
    return res.data;
  } catch (err) {
    throw new Error(
      `Error voting on poll with ID ${id} and ${votedOption}: ${err?.message}`
    );
  }
};
