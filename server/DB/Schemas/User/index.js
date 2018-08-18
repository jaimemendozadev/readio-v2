const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },
  
  playlists: [{type: mongoose.Schema.Types.ObjectId, ref: 'playlist'}]
});

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;