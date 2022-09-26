import React, { useState } from "react";
import axios from "axios";
import SignInForm from "./SignInForm";

const SignUpForm = () => {

    const [formSubmit, setFormSubmit] = useState(false);
    const [pseudo, setPseudo] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [controlPassword, setControlPassword] = useState("");
  
    const handleRegister = async (e) => {
      e.preventDefault();
      // const terms = document.getElementById("terms");
      const pseudoError = document.querySelector(".pseudo.error");
      const emailError = document.querySelector(".email.error");
      const passwordError = document.querySelector(".password.error");
      // const passwordConfirmError = document.querySelector(".password-confirm.error");
      // const termsError = document.querySelector(".terms.error");  
      // passwordConfirmError.innerHTML = "";
      // termsError.innerHTML = "";
  
      // if (password !== controlPassword || !terms.checked) {
      //   if (password !== controlPassword)
      //     passwordConfirmError.innerHTML =
      //       "Les mots de passe ne correspondent pas";
  
      //   if (!terms.checked)
      //     termsError.innerHTML = "Veuillez valider les conditions générales";
      // } else {
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



    return (

        <>
            {formSubmit ? (
                <>
                  <SignInForm />
                  <span></span>
                  <h4>Enregistrement réussi, veuillez-vous connecter</h4>
                </>
            ) : (
              <>
                <h2 id="sign-up-form">S'Inscrire </h2>
                <form action="" className="logSignForm" onSubmit={handleRegister} >
                  <label htmlFor="pseudo">Pseudo</label>
                  <input type="text" name="pseudo" id="pseudo" onChange={(e) => setPseudo(e.target.value)} value={pseudo} placeholder="Pseudo" />
                  <label htmlFor="email">Email</label>
                  <input type="text" name="email" id="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Email" />
                  <label htmlFor="password">Mot de passe</label>
                  <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Mot de Passe" />
                  {/* <label htmlFor="password-conf">Confirmer mot de passe</label>*/}
                  {/* <input
                      type="password"
                      name="password"
                      id="password-conf"
                      onChange={(e) => setControlPassword(e.target.value)}
                      value={controlPassword}
                  /> */}
                  {/* <div></div> */}
                  <div>
                    <input type="checkbox" id="terms" />
                    <label htmlFor="terms">
                        J'accepte les{" "}
                        <a href="/" target="_blank" rel="noopener noreferrer">conditions générales </a>
                    </label>
                  </div>
                  <input type="submit" value="Valider l'Inscription" className="btn btn--logForm"/>
                </form>
              </>
            )}
        </>
    )
}

export default SignUpForm;


