'use client'

import { useAppSelector, useAppDispatch } from '../../../lib/hooks'
import { useEffect } from 'react';
import { logout } from '../../../lib/slices/authSlice';

export default function UserHome() {
  const { isLoggedIn, user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('isLoggedIn state:', isLoggedIn);
  }, [isLoggedIn]);

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">User Login Status</h1>
      {isLoggedIn ? (
        <div>
          <p>Welcome, {user.firstname}!</p>
          <p>You are currently logged in.</p>
          <button
            onClick={handleLogout}
            className="px-4 py-2 mt-4 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition duration-200"
          >
            Log out
          </button>
        </div>

      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  );
}