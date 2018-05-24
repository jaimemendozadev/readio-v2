const User = require('../../../../DB/Schemas/User');

const createUser = async(_, {input}) => {
  
  const newUser = await User.create(input);  
  
  return newUser;
}

const deleteUser = async(_, {userID}) => {

  const deletedUser = await User.findByIdAndRemove(userID);

  return deletedUser;
}

const updateUser = async(_, {input}) => {
  const {id, ...updates} = input; 

  const updatedUser = await User.findByIdAndUpdate(id, updates);

  return updatedUser;

}

module.exports = {
  createUser,
  deleteUser,
  updateUser
}