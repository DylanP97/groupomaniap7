import React, { useState } from "react";
import axios from "axios";

const SignInForm = ( ) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");

    emailError.innerHTML = "";
    passwordError.innerHTML = "";

    await axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/login`,
      withCredentials: true,
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data.errors) {
          console.log("test")
          emailError.innerHTML = res.data.errors.email;
          passwordError.innerHTML = res.data.errors.password;
        } else {
          window.location = "/";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <form className="logSignForm" id="sign-in-form" action="" onSubmit={handleLogin} >
        <h1>Se Connecter à Groupomania</h1>
        <label className="labelSignForm" htmlFor="email">Email</label>
        <input className="inputSignForm" type="text" name="email" id="email" onChange={(e) =>
          setEmail(e.target.value)} placeholder="Email" value={email} />
        <div className="email error"></div>
        <br />
        <label className="labelSignForm" htmlFor="password">Mot de passe</label>
        <input className="inputSignForm" type="password" name="password" id="password" onChange={(e) =>
          setPassword(e.target.value)} placeholder="Mot de Passe" value={password} />
        <div className="password error"></div>
        <br />
        <input className="btn btn--logForm" type="submit" value="Je me connecte"/>
      </form>
    </>
  );
};

export default SignInForm;