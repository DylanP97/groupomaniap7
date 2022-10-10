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
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cookieParser());

// jwt
app.get('/jwtid', checkUser, (req, res) => {
  res.status(200).send(res.auth);
});

app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('./frontend/public/uploads', express.static('uploads'));

module.exports = app;