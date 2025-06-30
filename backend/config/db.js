import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/AuthTask`);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("Mongo Error", error.message);
    process.exit(1);
  }
};

export default connectDB;

