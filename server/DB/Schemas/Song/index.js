const {Schema, model} = require('mongoose');

const SongSchema = new Schema({
  title: String,
  permalink_url: String,
  artwork_url: String
});


const SongModel = model('song', SongSchema);

module.exports = SongModel;