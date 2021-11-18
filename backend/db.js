const mongoose = require('mongoose');

// For local db
// const MONGO_LOCAL_URI = require('./env')

// For remote db
const MONGO_REMOTE_URI = require('./env')

const connectToMongodb = () => {
    mongoose.connect(MONGO_REMOTE_URI, () => {
        console.log('Connected to mongodb successfully.....!');
    })
}

module.exports = connectToMongodb;