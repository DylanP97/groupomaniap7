import React, { useState } from "react";
import axios from "axios";
import SignInForm from "./SignInForm";
import passwordValidator from 'password-validator';


const SignUpForm = ( props ) => {

    const [formSubmit, setFormSubmit] = useState(false);
    const [pseudo, setPseudo] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [controlPassword, setControlPassword] = useState("");

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

    const handleRegister = async (e) => {
      e.preventDefault();
      const terms = document.getElementById("terms");
      const pseudoError = document.querySelector(".pseudo.error");
      const emailError = document.querySelector(".email.error");
      const passwordError = document.querySelector(".password.error");
      const passwordConfirmError = document.querySelector(".password-confirm.error");
      const termsError = document.querySelector(".terms.error");  
     
      passwordConfirmError.innerHTML = "";
      termsError.innerHTML = "";

      if (schema.validate(password) !== true || password !== controlPassword || !terms.checked) {
        if (schema.validate(password) !== true){
          passwordError.innerHTML =
          "Le mot de passe n'est pas correct";
        }
        if (password !== controlPassword)
          passwordConfirmError.innerHTML =
            "Les mots de passe ne correspondent pas";
        if (!terms.checked)
          termsError.innerHTML = "Veuillez valider les conditions générales";
      } else {
        await axios({
          method: "post",
          url: `${process.env.REACT_APP_API_URL}api/user/signup`,
          data: { pseudo, email, password },
        })
          .then((res) => {
            console.log(res);
            if (res.data.errors) {
              pseudoError.innerHTML = res.data.errors.pseudo;
              emailError.innerHTML = res.data.errors.email;
              passwordError.innerHTML = res.data.errors.password;
            } else {
              setFormSubmit(true);
            }
          })
          .catch((err) => console.log(err));
      }
    };

    return (

          <>
            {formSubmit ? (
                <>
                  <SignInForm />
                  <span></span>
                  <h4>Enregistrement réussi, veuillez-vous connecter</h4>
                </>
            ) : (
                <form action="" className="logSignForm"  id="sign-up-form" onSubmit={handleRegister} >
                  <label className="labelSignForm" htmlFor="pseudo">Pseudo</label>
                  <input className="inputSignForm" type="text" name="pseudo" id="pseudo" onChange={(e) =>
                    setPseudo(e.target.value)} value={pseudo} placeholder="Pseudo" />
                  <span className="pseudo error"></span>
                  <br />
                  <label className="labelSignForm" htmlFor="email">Email</label>
                  <input setcustomvalidity="Invalid field." className="inputSignForm" type="text" name="email" id="email" onChange={(e) =>
                    setEmail(e.target.value)} value={email} placeholder="Email" />
                  <span className="email error"></span>
                  <br />
                  <label className="labelSignForm" htmlFor="password">Mot de passe</label>
                  <input className="inputSignForm" type="password" name="password" id="password" onChange={(e) =>
                    setPassword(e.target.value)} value={password} placeholder="Mot de Passe" />
                  <span className="password error"></span>
                  <br />
                  <label className="labelSignForm" htmlFor="password-conf">Confirmer mot de passe</label>
                  <input className="inputSignForm" type="password" name="password" id="password-conf" onChange={(e) =>
                    setControlPassword(e.target.value)} value={controlPassword} placeholder="Confirmer le Mot de Passe"/>
                  <span className="password-confirm error"></span>
                  <br />
                  <div className="inputSignForm">
                    <input type="checkbox" id="terms" />
                    <label htmlFor="terms">
                      J'accepte les{" "}
                      <a href="/" target="_blank" rel="noopener noreferrer">conditions générales </a>
                    </label>
                  </div>
                  <span className="terms error"></span>
                  <br />
                  <input type="submit" value="Valider l'Inscription" className="btn btn--logForm"/>
                </form>
            )}
          </>
    )
}

export default SignUpForm;
