import React, { useState, useContext } from 'react';
import axios from 'axios';
import * as Yup from 'yup'; 
import './Login.css';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../context/User';

export default function Login() {

  const { setUserToken } = useContext(UserContext);
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [loader, setLoader] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const validateData = async () => {
    const LoginSchema = Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().min(8).max(20).required(),
    });

    try {
      await LoginSchema.validate(user, { abortEarly: false });
      return true;
    } catch (error) {
      console.log("Validation error:", error.errors);
      setLoader(false);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    if (!await validateData()) {
      console.log('Validation failed');
      return;
    }

    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signin`, {
        email: user.email,
        password: user.password,
      });
      
      setUser({
        email: '',
        password: '',
      });

      if (data.message === 'success') {
        toast.success('Login successful!', {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        localStorage.setItem('userToken', data.token);
        setUserToken(data.token);
        navigate('/');
      }}
      catch (error) {
        console.log(error.response);
      
        if (error.response && error.response.data && error.response.data.message === 'plz confirm your email') {
          toast.error('Please confirm your email before logging in!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        } else {
          toast.error('🦄 There was a conflict!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        }
      }
    finally {
      setLoader(false);
    }
  };

  // Navigate to Forget Password page
  const handleForgetPassword = () => {
    navigate('/forgetPassword'); 
  };

  return (
    <div className="login-container">
      <ToastContainer />
      <h2 className="login-title">Enter to your Account</h2>
      <form onSubmit={handleSubmit} className="login-form">
        
        <label className="login-label">Email</label>
        <input
          type="email"
          value={user.email}
          name="email"
          onChange={handleChange}
          className="login-input"
          required
        />

        <label className="login-label">Password</label>
        <input
          type="password"
          value={user.password}
          name="password"
          onChange={handleChange}
          className="login-input"
          required
        />

        <button type="submit" disabled={loader ? 'disabled' : null} className="login-button">
          {!loader ? 'Login' : 'Wait...'}
        </button>
        
        {/* Forget Password Button */}
        <button
          type="button"
          className="forget-password-button"
          onClick={handleForgetPassword}
        >
          Forget Password?
        </button>
      </form>
    </div>
  );
}
