const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authHeader = req.headers["authorization"];
  console.log(authHeader);
  let token = null;
  if (authHeader) {
    token = authHeader.split(" ")[1];
  }
  if (token == null) return res.sendStatus(401);
  console.log("Token found");
  jwt.verify(token, process.env.SECRET, (err, user) => {
    if(err) return res.sendStatus(401);
    //console.log(user);
    req.user = user;
  })
  next();
};
