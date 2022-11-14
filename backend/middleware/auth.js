const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");

module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.RANDOM_TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        res.cookie("jwt", " ", { maxAge: 1 });
        next();
      } else {
        let user = await UserModel.findById(decodedToken.id);
        
        res.locals.user = user;
        res.auth = decodedToken.id;
        res.isadmin = user.isAdmin;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};  