import mongoose from 'mongoose';

const PlaylistSchema = new mongoose.Schema({
  name: {type: String, required: true},
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
  songs: [{type: mongoose.Schema.Types.ObjectId, ref: 'song'}]
});


const PlaylistModel = mongoose.model('playlist', PlaylistSchema);

export default PlaylistModel;