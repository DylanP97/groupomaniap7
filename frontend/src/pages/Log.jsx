import React, { useState } from "react";

import SignInForm from "../components/Log/SignInForm";
import SignUpForm from "../components/Log/SignUpForm";

const Log = ( props ) => {

  const [signModal, setSignModal] = useState(props.signup ? true : false)

  const handleModals = (e) => {
    if (e.target.id === "register") {
      setSignModal(true);
    } else if (e.target.id === "login") {
      setSignModal(false)
    }
  };

  return (
    <main className="logPage">
      <section className="logPage__container">
        <div className="logPage__leftContainer"/>
        <div className="logPage__rightContainer">
        {signModal ? <SignUpForm signin={false} signup={true} /> : <SignInForm />}
          <div className="logBottomPart">
            {signModal ? <p onClick={handleModals} id="login">Already have an account ? Sign in</p> : <p onClick={handleModals} id="register">You don't have an account yet ? Sign up</p>  }
          </div>
        </div>
      </section>
    </main>
  );
};

export default Log;