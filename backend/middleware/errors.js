module.exports.signUpErrors = (err) => {
    let errors = { password: "", pseudo: "", email: ""};
  
    if (err.message.includes("pseudo"))
      errors.pseudo = "Username already taken or wrong";
  
    if (err.message.includes("email"))
      errors.email = "This email is not correct";

    if (err.message.includes("password"))
      errors.password = "The password must contain 6 to 100 characters have at least 1 upper case, a lower case, a number, a special character and no spaces";

    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("pseudo"))
      errors.pseudo = "This username is already taken";

    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
      errors.email = "This email is already registered";

    return errors;
  };
  
  module.exports.signInErrors = (err) => {
    let errors = { email: '', password: ''}
  
    if (err.message.includes("email")) 
      errors.email = "Unknown email";
    
    if (err.message.includes('password'))
      errors.password = "This password doesn't match"

    if (err.message.includes("_id"))
      errors.email = "Id error"
  
    return errors;
  }
  
  module.exports.uploadErrors = (err) => {
    let errors = { format: '', maxSize: ""};
  
    if (err.message.includes('invalid file'))
      errors.format = "Wrong format";
  
    if (err.message.includes('max size'))
      errors.maxSize = "This file is over 500ko";
  
    return errors
  }