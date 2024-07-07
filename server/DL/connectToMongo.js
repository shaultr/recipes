import mongoose from 'mongoose';

const uri = process.env.MONGO_URL;

export const connectToMongo = async () => {
  if (mongoose.connection.readyState >= 1) {
    console.log('Already connected to MongoDB');
    return;
  }

  return mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000, // 10 שניות
    socketTimeoutMS: 60000 // 60 שניות
  }).then(() => {
    console.log('Connected to MongoDB');
  }).catch(err => {
    console.error('Error connecting to MongoDB', err);
    throw new Error('Failed to connect to MongoDB');
  });
};