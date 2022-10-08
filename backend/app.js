const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors')
const {checkUser, requireAuth} = require('./middleware/auth');

require('dotenv').config()

const path = require('path')
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const helmet = require("helmet");


mongoose.connect(process.env.MONGO_SECRET,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  'allowedHeaders': ['Content-Type', 'Accept', 'Origin', 'X-Requested-With', 'Content', 'Authorization'],
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  'preflightContinue': false
}
app.use(cors(corsOptions));

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//   next();
// });

app.use(bodyParser.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cookieParser());

// jwt
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
  console.log(res.locals.user._id)
  const esriejsr = res.locals.user._id;
  const userIde = esriejsr.toString();
  console.log(userIde)
  res.auth = userIde
  console.log(res.auth)
  res.status(200).send(res.locals.user._id)
});


app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
// app.use('./frontend/public/uploads', express.static('uploads'));

module.exports = app;