import React, { useState } from "react";
import axios from "axios";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // const emailError = document.querySelector(".email.error");
    // const passwordError = document.querySelector(".password.error");

    axios({
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
          console.log("error in email")
          // emailError.innerHTML = res.data.errors.email;
          // passwordError.innerHTML = res.data.errors.password;
        } else {
          console.log("direction homepage 'normalement'")
          window.location = "/";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
       <h1 id="sign-up-form">Se Connecter</h1>
       <form className="logSignForm" action="" onSubmit={handleLogin} >
            <label htmlFor="email">Email</label>
            <input type="text" name="email" id="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" value={email} />
            <label htmlFor="password">Mot de passe</label>
            <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} placeholder="Mot de Passe" value={password} />
            <input type="submit" value="Je me connecte" className="btn btn--logForm"/>
        </form>

    </>
  );
};

export default SignInForm;