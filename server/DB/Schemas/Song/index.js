const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
  title: String,
  permalink_url: String,
  artwork_url: String
});


const SongModel = mongoose.model('song', SongSchema);

module.exports = SongModel;