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

        console.log("il y a un token checkUser")
        next();
      }
    });
  } else {
    res.locals.user = null;
    console.log("erreur token checkUser")
    next();
  }
};  

// module.exports.requireAuth = (req, res, next) => {
//   const token = req.cookies.jwt;
//   if (token) {
//     jwt.verify(token, process.env.RANDOM_TOKEN_SECRET, async (err, decodedToken) => {
//       if (err) {
//         res.sendStatus(200).json('token error when verified /jwtid RequireAuth')
//       } else {
//         console.log('Token was verified RequireAuth');
//         next();
//       }
//     });
//   } else {
//     console.log('No token here when /jwtid RequireAuth');
//   }
// };