const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SongSchema = new Schema({
  title: String,
  permalink_url: String,
  artwork_url: String,
  id_user_id_identifier: String,
});

const SongModel = mongoose.model('song', SongSchema);

module.exports = SongModel;
