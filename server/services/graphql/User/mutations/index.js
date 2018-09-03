const createUser = async (_, { input }, { models }) => {
  const { User } = models;
  const newUser = await User.create(input);

  return newUser;
};

const deleteUser = async (_, { userID }, { models }) => {
  const { User } = models;
  const deletedUser = await User.findByIdAndRemove(userID);

  return deletedUser;
};

const updateUser = async (_, { input }, { models }) => {
  const { User } = models;
  const { id, ...updates } = input;

  const updatedUser = await User.findByIdAndUpdate(id, updates);

  return updatedUser;
};

module.exports = {
  createUser,
  deleteUser,
  updateUser
};
