

import React, { useState } from 'react';
import axios from 'axios';
import * as Yup from 'yup'; 
import './Sign.css';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export default function Sign() {


  const navigate =useNavigate();

  const [user, setUser] = useState({
    userName: '',
    email: '',
    password: '',
    image: null,
  });


  const [loader,setLoader]=useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setUser({
      ...user,
      [name]: files[0],
    });
  };

  const validateData = async () => {
    const RegisterSchema = Yup.object({
      userName: Yup.string().min(5).max(20).required(),
      email: Yup.string().email().required(),
      password: Yup.string().min(8).max(20).required(),
      image: Yup.mixed().required('An image is required'),
    });

    try {
      await RegisterSchema.validate(user, { abortEarly: false });
      return true;
    } catch (error) {
      console.log("Validation error:", error.errors);
      setLoader(false)
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
      const formData = new FormData();
      formData.append('userName', user.userName);
      formData.append('email', user.email);
      formData.append('password', user.password);
      formData.append('image', user.image);

      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, formData);
      setUser({
        userName:'',
        email:'',
        password:'',
        image:null,
      });
      console.log('Sign-up successful:', data);
      if (data.message === 'success') {
        toast.success('🦄 Wow so easy!', {
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
        navigate('/');
      }
    } catch (error) {
      console.log(error.response);
      if (error.response.status === 409) {
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
    } finally{
      setLoader(false);
    }
  };

  return (
    <div className="sign-container">
       <ToastContainer />
      <h2 className="sign-title">Create an Account</h2>
      <form onSubmit={handleSubmit} className="sign-form">
        <label className="sign-label">User Name</label>
        <input
          type="text"
          value={user.userName}
          name="userName"
          onChange={handleChange}
          className="sign-input"
          required
        />

        <label className="sign-label">Email</label>
        <input
          type="email"
          value={user.email}
          name="email"
          onChange={handleChange}
          className="sign-input"
          required
        />

        <label className="sign-label">Password</label>
        <input
          type="password"
          value={user.password}
          name="password"
          onChange={handleChange}
          className="sign-input"
          required
        />

        <label className="sign-label">Profile Image</label>
        <input
          type="file"
          name="image"
          onChange={handleImageChange}
          className="sign-input"
          accept="image/*"
        />

        <button type="submit" disabled={loader? 'disabled' : null} className="sign-button">{!loader ?'register' :'wait...' }</button>
      </form>
    </div>
  );
}
