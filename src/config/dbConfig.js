const mongoose = require('mongoose');
const ServerConfig = require('./serverConfig'); // Correct casing


async function connectDB() {
    try {
        await mongoose.connect(ServerConfig.DB_URL); // Use ServerConfig here
        console.log("Successfully connected to the DB");
    } catch (error) {
        console.log('Something went wrong with the DB connection', error);
    }
}

module.exports = connectDB;

