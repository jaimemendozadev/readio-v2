import {Schema, model} from 'mongoose';

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

export default UserModel;