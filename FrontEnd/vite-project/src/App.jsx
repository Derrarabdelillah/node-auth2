import { useEffect } from 'react';
import './App.css'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function App() {
  const [user, setUser] = useState({ email: '', password: '' });
  const [error, setError] = useState({ email: '', password: '' });
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()

    const URL = 'http://localhost:3000/api';

    if (user.email && user.password) {

      try {
        const res = await axios.post(`${URL}/signup`, user, { withCredentials: true })
        if (res.status === 201 || res.status === 200) {
          setSuccess(res.data.message)
          setError({ email: '', password: '' });
          setTimeout( () => {
            navigate('/login');
          },3000 )
          console.log(res.data);
          return;
        }
      } catch (err) {
        if ( err.response && err.response.data && err.response.data.errors ) {
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
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Create an account</h1>

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded mb-4">{success}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              id="email"
              type="text"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200"
              placeholder="you@example.com"
            />
            {/* Show email error if it exists */}
            {error.email && <p className="text-red-600 text-sm mt-1">{error.email}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              id="password"
              type="password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200"
              placeholder="Enter a strong password"
            />
            {/* Show password error if it exists */}
            {error.password && <p className="text-red-600 text-sm mt-1">{error.password}</p>}
          </div>

          <button type="submit" className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-700 transition">Sign up</button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-500">Already have an account? <a href="#" className="text-indigo-600 hover:underline">Sign in</a></p>
      </div>
    </div>
  )
}

export default App;