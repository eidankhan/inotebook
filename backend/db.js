const mongoose = require('mongoose');

// Connect to local mongodb
// const mongoURI = 'mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false';

// Connect to remotely hosted db 
const mongoURI = "mongodb+srv://eidancodez:khan@remotedb.ywdty.mongodb.net/iNotebook"

const connectToMongodb = () => {
    mongoose.connect(mongoURI, () => {
        console.log('Connected to mongodb successfully.....!');
    })
}

module.exports = connectToMongodb;