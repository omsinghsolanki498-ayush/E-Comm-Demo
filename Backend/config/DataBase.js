const mongoose = require("mongoose"); // require mongoose

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);  // connect form mongoose uri form env
        console.log("Connected to MongoDB")
    }
    catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

module.exports = connectDb;