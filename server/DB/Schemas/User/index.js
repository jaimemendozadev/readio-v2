import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
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

export default UserModel;