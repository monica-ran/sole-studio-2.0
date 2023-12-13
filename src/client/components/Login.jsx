import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Logo from '../assets/solestudio - Copy.svg';
import loginImage from './photos/login.png';
import { useNavigate } from 'react-router-dom';

const Login = ( {setIsAdmin} ) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate()

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const login = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
  
      const result = await response.json();
      console.log(result);
      if (response.ok) {
        // If login is successful
        if (result.token) {
          setSuccessMessage('Login successful!');
          setErrorMessage('');
          setIsAdmin(result.admin);
          // Save the token to local storage
          localStorage.setItem('token', result.token);
  
          // Clear input fields
          setEmail('');
          setPassword('');
  
          // Navigate to the home page
          navigate('/');
          // window.location.reload();
        } else {
          // Handle the case where a token is not present in the response
          setErrorMessage('Email or password is incorrect');
          setSuccessMessage('');
        }
      } else {
        // If there is an error, set the error message and do not navigate
        if (result.name === 'MissingCredentialsError') {
          setErrorMessage('Please supply both an email and password');
        } else if (result.name === 'IncorrectCredentialsError') {
          setErrorMessage('Username or password is incorrect');
        } else {
          setErrorMessage(result.message || 'Login failed'); // or any specific error handling logic
          setSuccessMessage('');
        }
      }
    } catch (err) {
      setErrorMessage(`Error: ${err.message}`);
      setSuccessMessage('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

  return (
    <div className="py-64">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
        <div className="bg-cover w-1/2 hidden sm:block">
          <img
            src={loginImage}
            alt="Login"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="w-full p-8 lg:w-1/2">
          <h2 className="text-2xl font-semibold text-gray-700 text-center">Sole Studio</h2>
          <p className="text-xl text-gray-600 text-center">Welcome back!</p>

          {successMessage && (
            <div className="text-green-500 mt-4">{successMessage}</div>
          )}

          {errorMessage && (
            <div className="text-red-500 mt-4">{errorMessage}</div>
          )}

          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 lg:w-1/4"></span>
            <p className="text-xs text-center text-gray-500 uppercase">
              login with email
            </p>
            <span className="border-b w-1/5 lg:w-1/4"></span>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email Address
              </label>
              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="email"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
            <div className="mt-4">
              <div className="flex justify-between">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
              </div>
              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <div className="mt-8">
              <button
                className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 md:w-1/4"></span>
            <Link to="/signup" className="text-xs text-gray-500 uppercase">
              or sign up
            </Link>
            <span className="border-b w-1/5 md:w-1/4"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
