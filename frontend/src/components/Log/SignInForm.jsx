import React, { useState } from "react";
import axios from "axios";
import { useSignIn } from 'react-auth-kit'
import jwt_decode from "jwt-decode"
import { useNavigate } from "react-router-dom";


const SignInForm = () => {

  const baseUrl = `${process.env.REACT_APP_API_URL}api/user/login`
  const signIn = useSignIn() 
  const navigate = useNavigate() //permet de rediriger vers une pages

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [values, setValues] = useState({email:'', password: ''}) //values présentes dans le form envoyé au backend

  



  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   const emailError = document.querySelector(".email.error");
  //   const passwordError = document.querySelector(".password.error");

  //   axios({
  //     method: "post",
  //     url: `${process.env.REACT_APP_API_URL}api/user/login`,
  //     withCredentials: true,
  //     data: {
  //       email,
  //       password,
  //     },
  //   })


const handleChanges = (prop) => (event) => {
  setValues({ ...values, [prop]: event.target.value })
};

const toggleSubmit = (e)=>{
  e.preventDefault()
  const body = {
    email : values.email,
    password : values.password
  }  

  axios.post(baseUrl,body)
    .then((res) => {
      const decoded = jwt_decode(res.data.token)
      if(res.status === 200){
        if(signIn({token: res.data.token,
              expiresIn:3600,
              tokenType: "Bearer",
              authState: {
              email: body.email,
              id: decoded.userId,
              admin: decoded.isadmin
            },
            })){
              navigate('/')
            }else {
              //Throw error
            }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form className="logSignForm" id="sign-up-form" action="" onSubmit={toggleSubmit} >
      <label className="labelSignForm" htmlFor="email">Email</label>
      <input className="inputSignForm" type="text" name="email" id="email" onChange={handleChanges('email')}
       placeholder="Email" value={values.email} />
      <div className="email error"></div>
      <br />
      <label className="labelSignForm" htmlFor="password">Mot de passe</label>
      <input className="inputSignForm" type="password" name="password" id="password"  onChange={handleChanges('password')}
       placeholder="Mot de Passe" value={values.password} />
      <div className="password error"></div>
      <br />
      <input className="btn btn--logForm" type="submit" value="Je me connecte"/>
    </form>
  );
};

export default SignInForm;