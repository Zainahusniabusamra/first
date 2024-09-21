import React, { useState } from 'react';

export default function ForgetPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => setEmail(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = JSON.stringify({
      email: email
    });

    try {
      const response = await fetch('https://ecommerce-node4.onrender.com/auth/sendcode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: body
      });

      if (response.ok) {
        setMessage('A reset code has been sent to your email.');
      } else {
        setMessage('Failed to send reset code. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div>
      <h2>Forget Password</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input 
            type="email" 
            value={email} 
            onChange={handleEmailChange} 
            required 
          />
        </label>
        <button type="submit">Send Reset Code</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
