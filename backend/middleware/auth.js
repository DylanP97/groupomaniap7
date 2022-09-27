const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");

module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    // console.log('We have fetch the token in the cookies');
    jwt.verify(token, 'RANDOM_TOKEN_SECRET', async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        res.send(200).json('token error when verified')
        // res.cookie("jwt", "", { maxAge: 1 });
        next();
      } else {
        // console.log('Token was verified');
        let user = await UserModel.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    // console.log('No token here when CheckUser');
    res.locals.user = null;
    next();
  }
};

module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    // console.log('We have fetch the token in the cookies');
    jwt.verify(token, 'RANDOM_TOKEN_SECRET', async (err, decodedToken) => {
      if (err) {
        // console.log(err);
        res.send(200).json('token error when verified')
      } else {
        // console.log('Token was verified');
        next();
      }
    });
  } else {
    // console.log('No token here when RequireAuth');
  }
};



// const jwt = require('jsonwebtoken');


// module.exports = (req, res, next) => {

//     try {
//         const token = req.headers.authorization.split(' ')[1];
//         const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
//         const userTokenId = decodedToken.userId; 

//         console.log(token)
//         console.log(decodedToken)
//         console.log(userTokenId)
//         req.auth = {
//             userId: userTokenId,
//         };
//         next();
//     } catch(error) {
//         res.status(401).json({ error })
//     }
// };