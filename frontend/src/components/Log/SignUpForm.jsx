import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const SignUpForm = ( props ) => {

  const baseUrl = `${process.env.REACT_APP_API_URL}api/user/signup`
  const navigate = useNavigate() //permet de rediriger vers une pages

  const [values, setValues] = useState({
    pseudo:'',
    email:'',
    password: '',
    showPassword: false,
    confirmPassword:'',
    showConfirmPassword: false
  })

  const handleChanges = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  };
  

  const toggleSubmit = (e)=> {
    e.preventDefault()
    const body = {
      pseudo: values.pseudo,
      email : values.email,
      password : values.password
    }
    axios.post(baseUrl,body)
    .then((res) =>{     
      alert('votre profile a été créé')
      navigate('/Login')
    })
    .catch((err) =>{ console.log(err.response.data.error)})
  }

  
  return (
    <form action="" className="logSignForm"  id="sign-up-form" onSubmit={toggleSubmit} >
      <label className="labelSignForm" htmlFor="pseudo">Pseudo</label>
      <input className="inputSignForm" type="text" name="pseudo" id="pseudo" onChange={handleChanges('pseudo')} 
      value={values.pseudo} placeholder="Pseudo" />
      <span className="pseudo error"></span>
      <br />
      <label className="labelSignForm" htmlFor="email">Email</label>
      <input setcustomvalidity="Invalid field." className="inputSignForm" type="text" name="email" id="email" onChange={handleChanges('email')} 
      value={values.email} placeholder="Email" />
      <span className="email error"></span>
      <br />
      <label className="labelSignForm" htmlFor="password">Mot de passe</label>
      <input className="inputSignForm" type="password" name="password" id="password" onChange={handleChanges('password')}
        value={values.password} placeholder="Mot de Passe" />
      <span className="password error"></span>
      <br />
      <label className="labelSignForm" htmlFor="password-conf">Confirmer mot de passe</label>
      <input className="inputSignForm" type="password" name="password" id="password-conf" onChange={handleChanges('confirmPassword')}
        value={values.confirmPassword} placeholder="Confirmer le Mot de Passe"/>
      <span className="password-confirm error"></span>
      <br />
      <div className="inputSignForm">
        <input type="checkbox" id="terms" />
        <label htmlFor="terms">
          J'accepte les{" "}
          <a href="/useterms" target="_blank" rel="noopener noreferrer">conditions générales </a>
        </label>
      </div>
      <span className="terms error"></span>
      <br />
      <input type="submit" value="Valider l'Inscription" className="btn btn--logForm"/>
    </form>
  )
}

export default SignUpForm;