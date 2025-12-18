import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [user, setUser] = useState({ email: '', password: '' });
  const [error, setError] = useState({ email: '', password: '' });
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()

    const URL = 'http://localhost:3000/api';

    if (user.email && user.password) {

      try {
        const res = await axios.post(`${URL}/login`, user, { withCredentials: true })
        if (res.status === 201 || res.status === 200) {
          setError({ email: '', password: '' });
          setSuccess("Login successful! Redirecting to home...");
          setTimeout( () => {
            navigate('/home');
          },3000 )
          console.log(res.data);
          return;
        }
      } catch (err) {
        if ( err.response && err.response.data && err.response.data.errors ) {
          console.log(err.response.data.errors);
          setSuccess('');
          setError( err.response.data.errors );
        } else {
          setError({ general: "An error occurred. Please try again." });
        }
      }

    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Login</h1>

        {error.general && (
          <div className="bg-red-500 border border-red-200 text-red-700 px-4 py-2 rounded mb-4">{error.general}</div>
        )}

        {success && (
          <div className="bg-green-500 border border-green-200 text-green-700 px-4 py-2 rounded mb-4">{success}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              id="email"
              type="email"
              className="border border-gray-300 rounded-lg px-4 py-2 w-full"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            {error.email && <p className="text-red-500 text-xs">{error.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              id="password"
              type="password"
              className="border border-gray-300 rounded-lg px-4 py-2 w-full"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            {error.password && <p className="text-red-500 text-xs">{error.password}</p>}
          </div>

          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
