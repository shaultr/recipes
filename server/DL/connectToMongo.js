import mongoose from 'mongoose';

export const connectToMongo = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log('Already connected to MongoDB');
      return;
    }
    
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000 
    });
    
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    throw new Error('Failed to connect to MongoDB');
  }
};
