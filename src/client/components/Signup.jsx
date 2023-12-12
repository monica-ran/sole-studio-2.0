import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/solestudio - Copy.svg';
import signUpImage from './photos/signup.png';
import { useNavigate } from 'react-router-dom';

const Signup = () => {

const [first_name, setFirst] = useState('');
const [last_name, setLast] = useState('');
const [email, setEmail] = useState('');
const [password, setPass] = useState('');
const [successMessage, setSuccessMessage] = useState('');
const [errorMessage, setErrorMessage] = useState('');

const navigate = useNavigate()

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(`http://localhost:3000/api/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ first_name, last_name, email, password }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message);
    }

    const data = await response.json();
    localStorage.setItem('token', data.token);
    setSuccessMessage('Account created successfully!');
    setErrorMessage('Please try again with the correct email and password.');
    navigate('/')
    window.location.reload();
  } catch (error) {
    setErrorMessage(`Error: ${error.message}`);
    setSuccessMessage('');
  }
};

  return (
    <section className="bg-white h-screen flex flex-col lg:flex-row"> {/* Update the className here */}
    <div className="flex justify-center min-h-screen">
      <div className="lg:w-1/2 bg-cover hidden sm:block">
        <img
          src={signUpImage} // Use the variable with the correct import path
          alt="signup"
          className="object-cover w-full h-full"
        />
      </div>

        <div className="flex items-center w-full lg:w-1/2 p-8 lg:px-12">
          <div className="w-full max-w-3xl mx-auto">
            <h1 className="text-2xl font-semibold tracking-wider text-gray-800 capitalize dark:text-gray">
              Get your free account now.
            </h1>
            {successMessage && (
              <div className="text-green-500 mt-4">{successMessage}</div>
            )}

            {errorMessage && (
              <div className="text-red-500 mt-4">{errorMessage}</div>
            )}
            <p className="mt-4 text-gray-500 dark:text-gray-400">
              <strong> Sign Up to Checkout </strong>
            </p>

            {/*  */}

            <form className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2"
              onSubmit={handleSubmit}>
              <div>
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-500">First Name</label>
                <input
                  type="text"

                  value={first_name}
                  onChange={(e) => setFirst(e.target.value)}
                  placeholder="John"
                  required
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-500">Last name</label>
                <input
                  type="text"
                  
                  value={last_name}
                  onChange={(e) => setLast(e.target.value)}
                  placeholder="Snow"
                  required
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-500">Email address</label>
                <input
                  type="email"
                  
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="johnsnow@example.com"
                  required
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-500">Password</label>
                <input
                  type="password"
                  
                  value={password}
                  onChange={(e) => setPass(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <button
                className="flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              >
                <span>Sign Up </span>

                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 rtl:-scale-x-100 hidden" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
