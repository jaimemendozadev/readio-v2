const facebookAuth = (req, res) => {
  console.log("facebookAuth req is ", req);
  res.send('hit facebookAuth endpoint');
}

const googleAuth = (req, res) => {
  console.log('found user in req object ', req.user)
  res.send('successfully authenticated Google user');  
}

module.exports = {
  facebookAuth,
  googleAuth
}