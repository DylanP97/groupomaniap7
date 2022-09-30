import React, { useState } from "react";
import SignInForm from "./Log/SignInForm";
import SignUpForm from "./Log/SignUpForm";

const Log = ( props ) => {
  const [signUpModal, setSignUpModal] = useState(props.signup);
  const [signInModal, setSignInModal] = useState(props.signin);
  const [className, setClassName] = useState(false);

  const handleModals = (e) => {
    if (e.target.id === "register") {
      setSignInModal(false);
      setSignUpModal(true);
      setClassName(true);
    } else if (e.target.id === "login") {
      setSignUpModal(false);
      setSignInModal(true);
      setClassName(false);
    }
  };

  return (
    <div className="logPage">
      <div className="logPage__container">
        <div className="logPage__leftContainer"></div>
        <div className="logPage__rightContainer">
          <div className="logUpperPart">
            <div onClick={handleModals} id="register" className={className ? 'logModalBtn modal-noactive' : 'logModalBtn'} >S'inscrire</div>  
            <div onClick={handleModals} id="login" className={className ? 'logModalBtn': 'logModalBtn modal-noactive'} >Se connecter</div>
          </div>
          {signUpModal && <SignUpForm />}
          {signInModal && <SignInForm />}
        </div>
      </div>
    </div>
  );
};

export default Log;