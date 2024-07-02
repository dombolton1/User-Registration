'use client';

import { useState } from 'react';

export default function Register() {
  const [formState, setFormState] = useState({
    firstname: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    nameError: false,
    pwdError: false,
    pwdInvalid: false,
    emailInUse: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { firstname, surname, password, confirmPassword, email } = formState;
    const newErrors = {
      nameError: firstname.length < 2 || surname.length < 2,
      pwdError: password.length < 6,
      pwdInvalid: password !== confirmPassword,
      emailInUse: false,
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const newUser = {
      firstname: formState.firstname,
      surname: formState.surname,
      email: formState.email,
      password: formState.password,
    };

    try {
      const res = await fetch('http://localhost:3000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (res.status === 201) {
        console.log('User registered');
        window.location.href = '/user/login';
      } else if (res.status === 409) {
        setErrors((prevState) => ({ ...prevState, emailInUse: true }));
      } else {
        console.error('User registration failed');
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div className="flex flex-col justify-center mt-64 items-center flex-grow">
      <div className="max-w-md w-full p-6 bg-gray-100 rounded-lg shadow-lg">
        <h1 className="text-center text-xl mb-4">Register Account</h1>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          {errors.nameError && <p className="text-red-700">Names must be at least 2 characters long</p>}
          <label htmlFor="firstname">First Name <span className="text-red-700">*</span>:</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            placeholder="First Name"
            value={formState.firstname}
            onChange={handleChange}
            className="mb-4 px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
          <label htmlFor="surname">Surname <span className="text-red-700">*</span>:</label>
          <input
            type="text"
            id="surname"
            name="surname"
            placeholder="Surname"
            value={formState.surname}
            onChange={handleChange}
            className="mb-4 px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
          {errors.emailInUse && <p className="text-red-700">Email already in use!</p>}
          <label htmlFor="email">Email <span className="text-red-700">*</span>:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formState.email}
            onChange={handleChange}
            className={`mb-4 px-3 py-2 border ${errors.emailInUse ? 'border-red-700' : ''} rounded-lg focus:outline-none focus:border-blue-500`}
          />
          {errors.pwdError && <p className="text-red-700">Please make sure your password is at least 6 characters long</p>}
          {errors.pwdInvalid && <p className="text-red-700">Please make sure your confirmation password matches your password!</p>}
          <label htmlFor="password">Password <span className="text-red-700">*</span>:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={formState.password}
            onChange={handleChange}
            className={`mb-4 px-3 py-2 border ${errors.pwdInvalid ? 'border-red-700' : ''} rounded-lg focus:outline-none focus:border-blue-500`}
          />
          <label htmlFor="confirmPassword">Confirm Password <span className="text-red-700">*</span>:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formState.confirmPassword}
            onChange={handleChange}
            className={`mb-4 px-3 py-2 border ${errors.pwdInvalid ? 'border-red-700' : ''} rounded-lg focus:outline-none focus:border-blue-500`}
          />
          <button
            type="submit"
            className="px-4 py-2 mt-4 bg-blue-500 font-bold text-white rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
