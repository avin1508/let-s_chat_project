const mongoose = require("mongoose");

const dbUser = process.env.DB_USERNAME;
const dbPassword = encodeURIComponent(process.env.DB_PASSWORD); 
const dbClusterUrl = process.env.DB_CLUSTER_URL;



const connectToDB = async () => {
    try {
        const uri = `mongodb+srv://${dbUser}:${dbPassword}@${dbClusterUrl}/?retryWrites=true&w=majority`;
        await mongoose.connect(uri);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
};


module.exports = connectToDB;
