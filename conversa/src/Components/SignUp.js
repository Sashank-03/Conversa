import React, { useState } from 'react'
import logo from "../Images/fin1.jpg"
import { Backdrop, Button, CircularProgress, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Toaster from "./Toaster";
import { useDispatch, useSelector } from 'react-redux';
import { setLogInStatus, setSignUpStatus } from '../Features/authSlice'; // Import the auth action



function SignUp() {

  const dispatch = useDispatch();
  const logInStatus = useSelector((state) => state.auth.logInStatus);
  const signUpStatus = useSelector((state) => state.auth.signUpStatus);

  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  // const [logInStatus, setLogInStatus] = React.useState("");
  // const [signInStatus, setSignInStatus] = React.useState("");

  const navigate = useNavigate();

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };


  const signUpHandler = async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const response = await axios.post(
        "http://localhost:8080/user/register/",
        data,
        config
      );
      console.log(response);
      dispatch(setSignUpStatus({ msg: "Success", key: Math.random() }));
      navigate("/app/welcome");
      localStorage.setItem("userData", JSON.stringify(response));
      setLoading(false);
    } catch (error) {
      console.log(error);
      if (error.response.status === 405) {
        dispatch(setLogInStatus({
          msg: "User with this email ID already Exists",
          key: Math.random(),
        }));
      }
      if (error.response.status === 406) {
        dispatch(setLogInStatus({
          msg: "User Name already Taken, Please take another one",
          key: Math.random(),
        }));
      }
      setLoading(false);
    }
  };


  return (
    <>
    <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="secondary" />
      </Backdrop>

    <div className='login-container'>
        <div className='login-image'>
        <img src={logo} alt='logo' className='welcome-logo'/>
        </div>
        <div className='login-form'>
            <p className='login-heading'>Create your Account</p>
            <TextField id="outlined-basic" label="Enter User Name" variant="outlined" 
                onChange={changeHandler}
                name="name"
                helperText=""
                onKeyDown={(event) => {
                  if (event.code == "Enter") {
                    // console.log(event);
                    signUpHandler();
                  }
                }}
            />
            <TextField id="outlined-basic" label="Enter email address" variant="outlined" 
                 onChange={changeHandler}
                 name="email"
                 onKeyDown={(event) => {
                   if (event.code == "Enter") {
                     // console.log(event);
                     signUpHandler();
                   }
                 }}
            />
            <TextField id="outlined-password-input" type='password' label="Password" variant="outlined" autoComplete='current-password' 
                onChange={changeHandler}
                name="password"
                onKeyDown={(event) => {
                  if (event.code == "Enter") {
                    // console.log(event);
                    signUpHandler();
                  }
                }}
            />
            <Button variant="contained"  onClick={()=>signUpHandler()}>Sign Up</Button>
            <div className='login-footer'><p>Already have an account</p><span
                className="hyper"
                onClick={()=>navigate('/user/login')}
              >
                Log in
              </span></div>
              
            {signUpStatus &&
              <Toaster key={signUpStatus.key} message={signUpStatus.msg} />
            }
        </div>
      
    </div>
  </>
  )
}

export default SignUp
