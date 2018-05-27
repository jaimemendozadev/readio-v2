const facebookAuth = (req, res) => {
  console.log("facebookAuth req is ", req);
  res.send('hit facebookAuth endpoint');
}

const googleAuth = (req, res) => {
  console.log("googleAuth req is ", req);
  res.send('hit googleAuth endpoint');
  
}

module.exports = {
  facebookAuth,
  googleAuth
}