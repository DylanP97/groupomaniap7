import React, { useEffect, useState } from "react";
import SignInForm from "./Log/SignInForm";
import SignUpForm from "./Log/SignUpForm";

const Log = ( props ) => {

  console.log(props)

  const [signModal, setSignModal] = useState(props.signup ? true : false)
  const [className, setClassName] = useState(props.signup ? true : false);

  const handleModals = (e) => {
    if (e.target.id === "register") {
      setSignModal(true)
      setClassName(true);

    } else if (e.target.id === "login") {
      setSignModal(false)
      setClassName(false);
    }
  };



  return (
    <div className="logPage">
      <div className="logPage__container">
        <div className="logPage__leftContainer"/>
        <div className="logPage__rightContainer">
          <div className="logUpperPart">
            <div onClick={handleModals} id="register" className={className ? 'logModalBtn modal-noactive' : 'logModalBtn'}>S'inscrire</div>  
            <div onClick={handleModals} id="login" className={className ? 'logModalBtn': 'logModalBtn modal-noactive'}>Se connecter</div>
          </div>
          {signModal ? <SignUpForm signin={false} signup={true} /> : <SignInForm />}
        </div>
      </div>
    </div>
  );
};

export default Log;