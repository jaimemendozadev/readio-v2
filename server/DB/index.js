const mongoose = require('mongoose');

const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL);

const DB = mongoose.connection;

mongoose.Promise = global.Promise;

DB.on('error', console.error.bind(console, 'MongoDB connection error:'));

DB.on('connected', () => console.log('Connected to the Mongoose DB'));

module.exports = DB;