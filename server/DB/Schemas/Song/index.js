import mongoose from 'mongoose';

const SongSchema = new mongoose.Schema({
  title: String,
  permalink_url: String,
  artwork_url: String
});


const SongModel = mongoose.model('song', SongSchema);

export default SongModel;