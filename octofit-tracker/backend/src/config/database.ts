import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
const db = mongoose.connection;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB: octofit_db');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  });

db.on('error', console.error.bind(console, 'connection error:'));

export const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};

export const disconnectDatabase = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.log('Database disconnected successfully');
  } catch (error) {
    console.error('Database disconnection failed:', error);
  }
};

export default db;
