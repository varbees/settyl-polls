import mongoose from 'mongoose';
import { __db__ } from '../constants.js';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(__db__);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(`Error: ${err?.message}`);
    process.exit(1);
  }
};

export default connectDB;
