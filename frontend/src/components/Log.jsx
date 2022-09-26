import React, { useState } from "react";
import SignInForm from "./Log/SignInForm";
import SignUpForm from "./Log/SignUpForm";

const Log = ( props ) => {
  const [signUpModal, setSignUpModal] = useState(props.signup);
  const [signInModal, setSignInModal] = useState(props.signin);

  const handleModals = (e) => {
    if (e.target.id === "register") {
      setSignInModal(false);
      setSignUpModal(true);
    } else if (e.target.id === "login") {
      setSignUpModal(false);
      setSignInModal(true);
    }
  };

  return (
    <div className="logPage">
      <div className="logPage__container">
        <div className="logPage__leftContainer">
          {/* <img src="../assets/styles/Logos/icon-left-font.png" alt="LogoGroupomania" /> */}
        </div>
        <div className="logPage__rightContainer">
          <div className="logPage__upperBand">
              <button className="logPage__modalBtn--left" onClick={handleModals} id="register">S'inscrire</button>  
              <button className="logPage__modalBtn--right" onClick={handleModals} id="login">Se connecter</button>
          </div>
          {signUpModal && <SignUpForm />}
          {signInModal && <SignInForm />}
        </div>
      </div>
    </div>
  );
};

export default Log;