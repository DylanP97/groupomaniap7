require('dotenv').config()
const express = require('express');
const helmet = require("helmet");
const path = require('path')
const app = express();
const mongoose = require('mongoose');

app.use(helmet({ crossOriginResourcePolicy: false }))

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');



mongoose.connect(process.env.MONGO_SECRET,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.json())

// jwt
// app.get('*', checkUser);
// app.get('/jwtid', requireAuth, (req, res, next) => {
//   console.log(res.auth.user)
//   res.status(200).send(res.auth.user)
// });

app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')))

module.exports = app;