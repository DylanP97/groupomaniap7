import React, { useState } from "react";
import axios from "axios";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/login`,
    //   withCredentials: true,
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data.errors) {
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
       <h1 id="sign-up-form">SignInForm </h1>
       <form action="" onSubmit={handleLogin} >
            <label htmlFor="email">Email</label>
            <br />
            <input type="text" name="email" id="email" onChange={(e) => setEmail(e.target.value)} value={email} />
            <br />
            <label htmlFor="password">Mot de passe</label>
            <br />
            <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} />
            <br />
            <input type="submit" value="Se connecter" />
        </form>

    </>
  );
};

export default SignInForm;