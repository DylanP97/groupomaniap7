const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const validator = require('validator');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');

let emailRegExp = new RegExp('^[a-zA-Z0-9._\-]+[@]{1}(groupomania)+[.]{1}[a-z]{2,10}$');



const userSchema = mongoose.Schema({
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

// userSchema.plugin(uniqueValidator)
// play function before save into display: 'block',
userSchema.pre("save", async function(next) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect email')
};

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;

