import React from 'react'
import React, {useState} from "react";
import { login } from "../services/API";
import imgCross from './img/icons/cross.png';
import imgTick from './img/icons/tick.png';
import './css/LoginForm.css'

const Signin = () => {
  // states for registering
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  
  // states for checking the errrors 
  const [sumbitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [passwordValid, setPasswordValid] = useState([false,false,false,false]);
  
  // for handling Email
  const handleEmail  = (e) => {
  setEmail(e.target.value);
  setSubmitted(false);
  };
  
  //for handling passsowrd
  const handlePassword = (e) => {
  setPassword(e.target.value);
  passwordValidation(e.target.value);
  setImage(passwordValid);
  setSubmitted(false);
  };
  
  const updateElement = (index, newValue) => {
      setPasswordValid(prevArray => prevArray.map((item, i) => i === index ? newValue : item));
    };
  
  
const passwordValidation = (password) => {
    const tests = [
        { test: (pw) => pw.length > 8, index: 0 },
        { test: (pw) => /[A-Z]/.test(pw), index: 1 },
        { test: (pw) => /[a-z]/.test(pw), index: 2 },
        { test: (pw) => /[0-9]/.test(pw), index: 3 },
    ];

    tests.forEach(({ test, index }) => {
        if (test(password)) {
            updateElement(index, true);
        } else {
            updateElement(index, false);
        }
    });
};
 
  //for Handling submit button
  const handleSubmit = (e) => {
      e.preventDefault();
    // Basic validation
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
  
    // Email validation using regular expression
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
  
    if(passwordValid.includes(false)){
      setError('Please enter a valid password');
      return;
    }
   
    login(email,password).then((res) => {
      // console.log(res);
      setSubmitted(true);
      setError(false); 
  });
  };
  
  const setImage = (validation,option) => {
    if(option !== undefined){
        return passwordValid[option] ? imgTick : imgCross;
    }
    return validation ? imgTick : imgCross;
};
  // Handling SuccessMessege
  const successMessege  = () => {
  return(
      <div
      className="success"
      style ={{
          display : sumbitted ? '' : 'none', color: "green",fontSize: "10px"
      }}>
      <h1>{email} successfully registered!</h1>
      </div>
      )
  };
  
  // Handling Error message
  const errorMessege = () => {
      return (
      <div
      className="error"
      style={{
      display: error ? '' : 'none',color: "red",fontSize: "10px"
      }}>
      <h1>Please enter all the fields</h1>
      </div>
      );
      };
  
      return(
          <div className="container">
          <div className="screen">
              <div className="screen__content">
                  <form className="login" onSubmit={handleSubmit}>
                  <div className="messeges">
                   {/* calling for methods */}
                  {errorMessege()}
                  {successMessege()} 
                  </div>
                      <div className="login__field">
                          <i className="login__icon fas fa-user"></i>
                          <input type="text" onChange={handleEmail} className="login__input" placeholder="User name / Email"/>
                          {/* <section className="login__error">Please enter a valid email address</section> */}
                      </div>
                      <div className="login__field">
                          <i className="login__icon fas fa-lock"></i>
                          <input type="password" onChange={handlePassword} className="login__input" placeholder="Password"/>
                      </div>
                      <button className="button login__submit">
                          <span className="button__text">Signup up Now</span>
                          <i className="button__icon fas fa-chevron-right"></i>
                      </button>
                      <div className="password_validation" style={{display: password ? '' :"none"}}>
                          <p className="validation_text"><img src={setImage(passwordValid,0)} className="validation-icon" alt="validation" />Contain at least 8 characters</p>
                          <p className="validation_text"><img src={setImage(passwordValid,1)} className="validation-icon" alt="validation" />Contain at least one uppercase letter</p>
                          <p className="validation_text"><img src={setImage(passwordValid,2)} className="validation-icon" alt="validation" />Contain at least one lowercase letter</p>
                          <p className="validation_text"><img src={setImage(passwordValid,3)} className="validation-icon" alt="validation" />Contain at least one number</p>
                      </div>			
                  </form>
                  <div className="social-login">
                      <h3>log in via</h3>
                      <div className="social-icons">
                          <a href="#" className="social-login__icon fab fa-instagram"></a>
                          <a href="#" className="social-login__icon fab fa-facebook"></a>
                          <a href="#" className="social-login__icon fab fa-twitter"></a>
                      </div>
                  </div>
              </div>
              <div className="screen__background">
                  <span className="screen__background__shape screen__background__shape4"></span>
                  <span className="screen__background__shape screen__background__shape3"></span>		
                  <span className="screen__background__shape screen__background__shape2"></span>
                  <span className="screen__background__shape screen__background__shape1"></span>
              </div>		
          </div>
          {/* <Helmet>
          import 'https://use.fontawesome.com/releases/v5.2.0/css/all.css';
          import 'https://use.fontawesome.com/releases/v5.2.0/css/fontawesome.css';
          </Helmet> */}
      </div>
  
      );
}

export default Signin