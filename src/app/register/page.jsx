'use client'

import { useState } from 'react';

export default function Register() {
  const [firstname, setFirstname] = useState('');
  const [surname, setSurname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(firstname, surname, email, password, confirmPassword)
  }

  return (
    <div className="flex flex-col justify-center mt-64 items-center flex-grow">
      <div className="max-w-md w-full p-6 bg-gray-100 rounded-lg shadow-lg">
        <h1 className="text-center text-xl mb-4">Register Account</h1>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="first-name">First Name:</label>
          <input
            type="text"
            id="firstname"
            placeholder="First Name"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            className="mb-4 px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
          <label htmlFor="surname">Surname:</label>
          <input
            type="text"
            id="surname"
            placeholder="Surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            className="mb-4 px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
          <label htmlFor="pwd">Password:</label>
          <input
            type="password"
            id="pwd"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
          <label htmlFor="pwd">Confirm Password:</label>
          <input
            type="password"
            id="pwdconfirm"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mb-4 px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}