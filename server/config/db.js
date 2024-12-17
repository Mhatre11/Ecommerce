import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    await mongoose.connect(mongoUri);
    console.log(`Successfully connected to mongoDB \u{1F493}`);
  } catch (error) {
    console.error(`ERROR : ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
