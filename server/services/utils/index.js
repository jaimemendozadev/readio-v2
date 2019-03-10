const verifyToken = req => {
  let sliced = req.headers.authorization;
  console.log('req.headers authorization is ', req.headers.authorization);
  sliced = sliced.slice(7);

  const secret = process.env.JWT_KEY;

  const decoded = jwt.verify(sliced, secret);
  const {userID} = decoded;

  return userID;
};

module.exports = {
  verifyToken,
};
