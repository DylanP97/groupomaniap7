import React, { useState } from "react";

import SignInForm from "../components/Log/SignInForm";
import SignUpForm from "../components/Log/SignUpForm";

const Log = ( props ) => {

  const [signModal, setSignModal] = useState(props.signup ? true : false)

  const handleModals = (e) => {
    if (e.target.id === "register") {
      setSignModal(true)

    } else if (e.target.id === "login") {
      setSignModal(false)
    }
  };


  return (
    <main className="logPage">
      <section className="logPage__container">
        <div className="logPage__leftContainer"/>
        <div className="logPage__rightContainer">
          <div className="logUpperPart">
            <div onClick={handleModals} id="register" className='logModalBtn'>S'inscrire</div>  
            <div onClick={handleModals} id="login" className='logModalBtn'>Se connecter</div>
          </div>
          {signModal ? <SignUpForm signin={false} signup={true} /> : <SignInForm />}
        </div>
      </section>
    </main>
  );
};

export default Log;