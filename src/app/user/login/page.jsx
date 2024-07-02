'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks';
import { loginSuccess } from '../../../lib/slices/authSlice';
import { redirect } from 'next/navigation'


export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { isLoggedIn } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = { email, password };

    try {
      const res = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });

      if (res.ok) {
        const data = await res.json();
        // console.log('USER: ', data.user)
        dispatch(loginSuccess(data.user));
      } else if (res.status === 401) {
        setError('Email or password is incorrect');
      } else if (res.status === 500) {
        setError('Server error');
      } else {
        setError('Login failed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log('isLoggedIn state:', isLoggedIn);
  }, [isLoggedIn]);

  if(isLoggedIn) {
    redirect('/user/home')
  }

  return (
    <div className="flex flex-col justify-center mt-64 items-center flex-grow">
      <div className="max-w-md w-full p-6 bg-gray-100 rounded-lg shadow-lg">
        <h1 className="text-center text-xl mb-4">Log in:</h1>
        <form className="flex flex-col" onSubmit={handleSubmit}>
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
          {error.length > 0 ? <h2 className="text-red-700 text-center">{error}</h2> : ''}
          <button
            type="submit"
            className="px-4 py-2 mt-4 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Log in
          </button>
        </form>
        <div className="flex justify-center mt-4">
          <Link className="text-blue-700 font-bold underline" href='/user/register'>Register an account here</Link>
        </div>
      </div>
    </div>
  );
}
