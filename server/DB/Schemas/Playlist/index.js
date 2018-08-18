const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlaylistSchema = new Schema({
  name: { type: String, required: true },
  songs: []
});

const PlaylistModel = mongoose.model("playlist", PlaylistSchema);

module.exports = PlaylistModel;
