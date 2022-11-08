const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const validator = require('validator');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');
const passwordValidator = require('password-validator');

let emailRegExp = new RegExp('^[a-zA-Z0-9._\-]+[@]{1}(groupomania)+[.]{1}[a-z]{2,10}$');

var schema = new passwordValidator();

  schema
  .is().min(6)
  .is().max(100)                                             
  .has().uppercase()  
  .has().lowercase()                                          
  .has().digits(1)                                          
  .has().symbols(1)                                           
  .has().not().spaces()                                       
  .has().not('password')                                      
  .has().not('123')                                           
  .has().not('{', '}', '=', "'");


const userSchema = new mongoose.Schema(
  {    
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
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function(next) {
  if (schema.validate(this.password)){
    console.log("triggerda")
    // const salt = await bcrypt.genSalt();
    // console.log("salt : " + salt)
    let hash = await bcrypt.hash(this.password, 10);
    console.log("hash : " + hash)
    this.password = hash
    console.log("this.password : " + this.password)

  } else {
    throw Error('incorrect password');
  }
  next();
});

userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({email});
  if (user) {
    console.log(password)
    console.log(user.password)
    const auth = await bcrypt.compare(password, user.password);
    console.log(auth)
    if (auth) {
      console.log("truee")
      return user;
    } else {
      throw Error('incorrect password');
    }
  } else {
    throw Error('incorrect email')
  }
};

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;

