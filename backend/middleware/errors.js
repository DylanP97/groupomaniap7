module.exports.signUpErrors = (err) => {
    let errors = { password: "", pseudo: "", email: ""};

    console.log(err.message)
  
    if (err.message.includes("pseudo"))
      errors.pseudo = "Pseudo incorrect ou déjà pris";
  
    if (err.message.includes("email"))
      errors.email = "Cet email est incorrect";

    if (err.message.includes("password"))
      errors.password = "Le mot de passe doit contenir 6 à 100 caractères avoir 1 majuscule, 1 miniscule, 1 numéro, 1 caractère spécial, pas d'espaces";

    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("pseudo"))
      errors.pseudo = "Ce pseudo est déjà pris";

    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
      errors.email = "Cet email est déjà enregistré";

    return errors;
  };
  
  module.exports.signInErrors = (err) => {
    let errors = { email: '', password: ''}
  
    console.log(err.message)

    if (err.message.includes("email")) 
      errors.email = "Email inconnu";
    
    if (err.message.includes('password'))
      errors.password = "Le mot de passe ne correspond pas"

    if (err.message.includes("_id"))
      errors.email = "Id error"
  
    return errors;
  }
  
  module.exports.uploadErrors = (err) => {
    let errors = { format: '', maxSize: ""};
  
    if (err.message.includes('invalid file'))
      errors.format = "Format incompatabile";
  
    if (err.message.includes('max size'))
      errors.maxSize = "Le fichier dépasse 500ko";
  
    return errors
  }