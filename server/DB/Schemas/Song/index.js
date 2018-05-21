import {Schema, model} from 'mongoose';

const SongSchema = new Schema({
  title: String,
  permalink_url: String,
  artwork_url: String
});


const SongModel = model('song', SongSchema);

export default SongModel;