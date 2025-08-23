import mongoose from "mongoose";

const Mongo = async () => {
  try {
const conn = await mongoose.connect(
  "mongodb+srv://aradhayjain2006:qgh7A6ycsMAUzPwn@cluster0.jadrgk9.mongodb.net/test?retryWrites=true&w=majority"
);

    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    console.log(`📂 Database in use: ${conn.connection.name}`);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

export default Mongo;
