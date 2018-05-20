const {Schema, model} = require('mongoose');

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
  
  playlists: [{type: Schema.Types.ObjectId, ref: 'playlist'}]
});

const UserModel = model('user', UserSchema);

module.exports = UserModel;