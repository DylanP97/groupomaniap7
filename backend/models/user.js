const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const validator = require('validator');

const userSchema = mongoose.Schema({
    pseudo: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 55,
      unique: true,
      trim: true
    },
    email: { type: String, required: true, unique: true, validator(value){
        if(!validator.isEmail(value)){
            throw new Error("invalid email")
        }
      }
    },
    password: {
      type: String,
      required: true
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

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema);