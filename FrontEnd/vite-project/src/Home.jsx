import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Cookies from 'js-cookie'

const Home = () => {

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Welcome to Home Page</h1>
        <p className="text-gray-600">
            This is the home page of the application. You have successfully navigated here after signing up.
        </p>
        {/* Button that goes to /products */}
        <div className="mt-6 text-center">
            <a
                href="/products"
                className="inline-block px-6 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition"
            >
                View Products
            </a>
        </div>  
      </div>
    </div>
  );
};

export default Home;
