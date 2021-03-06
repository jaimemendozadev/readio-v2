const User = require('../../DB/Schemas/User');

const getCreateUser = async ({_json}) => {
  const first_name = _json.name.givenName;
  const last_name = _json.name.familyName;
  const email = _json.email;
  const image_url = _json.picture;

  const newUser = {
    first_name,
    last_name,
    email,
    image_url,
  };

  try {
    let userInDB = await User.find({email});

    if (userInDB.length == 0) {
      userInDB = await User.create(newUser);
    }

    return userInDB;
  } catch (error) {
    console.log('error finding Google User in DB ', error);
  }
};

const findUserInDB = async ({userID}) => {
  try {
    let userInDB = await User.findById(userID);

    if (userInDB) {
      return userInDB;
    }
  } catch (error) {
    console.log('error finding Google User in DB ', error);
  }
};

module.exports = {
  getCreateUser,
  findUserInDB,
};
