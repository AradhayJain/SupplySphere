import mongoose from "mongoose";

const MongoDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
        dbName: "myNewDB", // 👈 hardcoded database name
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    console.log(`📂 Database in use: ${conn.connection.name}`);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

export default MongoDB;
