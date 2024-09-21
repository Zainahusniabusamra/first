import React, { useState } from 'react';

export default function NewPassword() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleCodeChange = (e) => setCode(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = JSON.stringify({
      email: email,
      password: password,
      code: code
    });

    try {
      const response = await fetch('https://ecommerce-node4.onrender.com/auth/forgotPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: body
      });

      if (response.ok) {
        setMessage('Password reset successful. You can now log in with your new password.');
      } else {
        setMessage('Failed to reset password. Please check your code and try again.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
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
        <br />
        <label>
          New Password:
          <input 
            type="password" 
            value={password} 
            onChange={handlePasswordChange} 
            required 
          />
        </label>
        <br />
        <label>
          Reset Code:
          <input 
            type="text" 
            value={code} 
            onChange={handleCodeChange} 
            required 
          />
        </label>
        <br />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
