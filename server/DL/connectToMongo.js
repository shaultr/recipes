import mongoose from 'mongoose';

const uri = process.env.MONGO_URI;

export const connectToDatabase = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  return mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // 5 שניות
    socketTimeoutMS: 45000 // 45 שניות
  }).then(() => {
    console.log('Connected to MongoDB');
  }).catch(err => {
    console.error('Error connecting to MongoDB', err);
  });
};
