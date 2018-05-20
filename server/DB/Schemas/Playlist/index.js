const {Schema, model} = require('mongoose');

const PlaylistSchema = new Schema({
  name: String,
  user: {type: Schema.Types.ObjectId, ref: 'user'},
  songs: []
});


const PlaylistModel = model('playlist', PlaylistSchema);

module.exports = PlaylistModel;