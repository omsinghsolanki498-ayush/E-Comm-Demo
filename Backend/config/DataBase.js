// const mongoose = require("mongoose"); // require mongoose

// const connectDb = async () => {
//     try {
//         await mongoose.connect(process.env.MONGODB_URI);  // connect form mongoose uri form env
//         console.log("Connected to MongoDB")
//     }
//     catch (error) {
//         console.error("Error connecting to MongoDB:", error);
//     }
// }

// module.exports = connectDb;

const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    console.log(
      "MongoDB URI:",
      process.env.MONGODB_URI
        ? process.env.MONGODB_URI.replace(/:([^:@]+)@/, ":****@")
        : "NOT FOUND"
    );

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("Connected to MongoDB Atlas");
    console.log("Database:", mongoose.connection.name);
    console.log("Host:", mongoose.connection.host);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
};

module.exports = connectDb;