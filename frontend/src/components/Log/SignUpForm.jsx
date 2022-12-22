import React, { useState } from "react";
import axios from "axios";
import SignInForm from "./SignInForm";

import view from '../../assets/styles/Icons/view.png'
import hidden from '../../assets/styles/Icons/hidden.png'

const SignUpForm = ( props ) => {

    const [formSubmit, setFormSubmit] = useState(false);
    const [pseudo, setPseudo] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [controlPassword, setControlPassword] = useState("");

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

      if(!formSubmit){
        if (password !== controlPassword || !terms.checked) {
          if (password !== controlPassword)
            passwordConfirmError.innerHTML = "The passwords don't match";
          if (!terms.checked)
            termsError.innerHTML = "Please accept the terms and conditions";
        } else {
          await axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/user/signup`,
            data: { pseudo, email, password },
          })
            .then((res) => {
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
      }
    };

    const ShowPassword = (e) => {
      var eyeIcon = e.target;
      var passwordDiv = e.target.parentElement;
      var passwordInput = passwordDiv.firstChild;

      if(passwordInput.type === 'password') {
        passwordInput.setAttribute("type", "text")
        console.log(e.target.src)
        eyeIcon.src=`${view}`
      }
      else {
        passwordInput.setAttribute("type", "password")
        eyeIcon.src=`${hidden}`
      }
    }

    return (
      <>
        {formSubmit ? (
          <>
            <SignInForm />
            <span></span>
            <h4>Registration successful, login</h4>
          </>
        ) : (
          <>
            <h1>Welcome! Signup</h1>
            <form action="" className="logSignForm"  id="sign-up-form" onSubmit={handleRegister} >
              <label className="labelSignForm" htmlFor="pseudo">Username</label>
              <input autoFocus className="inputSignForm" type="text" name="pseudo" id="pseudo" onChange={(e) =>
                setPseudo(e.target.value)} value={pseudo} placeholder="Username" />
              <span className="pseudo error"></span>
              <br />
              <label className="labelSignForm" htmlFor="email">Email</label>
              <input setcustomvalidity="Invalid field." className="inputSignForm" type="text" name="email" id="email" onChange={(e) =>
                setEmail(e.target.value)} value={email} placeholder="Email" />
              <span className="email error"></span>
              <br />
              <label className="labelSignForm" htmlFor="password">Password</label>

              <div className="password-input-div">
                <input className="inputSignForm" type="password" name="password" id="password" onChange={(e) =>
                  setPassword(e.target.value)} value={password} placeholder="Password" />
                <img onClick={ShowPassword} className="password-eye" src={hidden} alt={hidden} />
              </div>
              <span className="password error"></span>

              <br />
              <label className="labelSignForm" htmlFor="password-conf">Confirm password</label>

              <div className="password-input-div">
                <input className="inputSignForm" type="password" name="password" id="password-conf" onChange={(e) =>
                  setControlPassword(e.target.value)} value={controlPassword} placeholder="Confirm password"/>
                <img onClick={ShowPassword} className="password-eye" src={hidden} alt={hidden} />
              </div>
            
              <span className="password-confirm error"></span>
              <br />
              <div className="inputSignForm">
                <input type="checkbox" id="terms" />
                <label htmlFor="terms">
                  I accept the{" "}
                  <a href="/useterms" target="_blank" rel="noopener noreferrer">terms and conditions</a>
                </label>
              </div>
              <span className="terms error"></span>
              <br />
              <input type="submit" value="Complete registration" className="btn btn--logForm"/>
            </form>
          </>
        )}
      </>
    )
}

export default SignUpForm;