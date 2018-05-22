import User from '../../../../DB/Schemas';



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


