import mongoose from 'mongoose';

const PlaylistSchema = new mongoose.Schema({
  name: {type: String, required: true},
  songs: []
});


const PlaylistModel = mongoose.model('playlist', PlaylistSchema);

export default PlaylistModel;