import User from '../../../../DB/Schemas/User';

export const createUser = async(_, {input}) => {
  
  const newUser = await User.create(input);  
  
  return newUser;
}

export const deleteUser = async(_, {userID}) => {

  const deletedUser = await User.findByIdAndRemove(userID);

  return deletedUser;
}

export const updateUser = async(_, {input}) => {
  const {id, ...updates} = input; 

  const updatedUser = await User.findByIdAndUpdate(id, updates);

  return updatedUser;

}


