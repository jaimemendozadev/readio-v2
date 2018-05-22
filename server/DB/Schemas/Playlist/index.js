import {Schema, model} from 'mongoose';

const PlaylistSchema = new Schema({
  name: {type: String, required: true},
  user: {type: Schema.Types.ObjectId, ref: 'user'},
  songs: []
});


const PlaylistModel = model('playlist', PlaylistSchema);

export default PlaylistModel;