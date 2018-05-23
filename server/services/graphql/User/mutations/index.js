import User from '../../../../DB/Schemas/User';



export const createUser = async(_, {input}) => {
  //create User in DB  
  const newUser = await User.create(input).exec();  
  return newUser;
}



export const deleteUser = async(_, {id}) => {
  //detele User from DB

  const deletedUser = await User.findByIdAndRemove(id);

  return deletedUser;
}


export const updateUser = async(_, {input}) => {
  const {id, ...updates} = input;
  const updatedUser = await User.findByIdAndUpdate(id, updates).exec();

  console.log('the updatedUser is ', updatedUser);

  return updatedUser;

}


