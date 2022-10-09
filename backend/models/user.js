const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const validator = require('validator');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');

let emailRegExp = new RegExp('^[a-zA-Z0-9._\-]+[@]{1}(groupomania)+[.]{1}[a-z]{2,10}$');

const userSchema = new mongoose.Schema({
    pseudo: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 55,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate: emailRegExp
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      maxLength: 100,
    },
    imageUrl: {
      type: String,
      default: "./uploads/profil/random-user.png"
    },
    job: {
      type: String,
      minLength: 3,
      maxLength: 55,
    },
    bio :{
      type: String,
      max: 1024,
    },
    isAdmin :{
      type: Boolean,
      default: false,
      required: true
    },
});


const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;



