import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const products = [
    { _id: "1", name: "Product 1", price: 10.99 },
    { _id: "2", name: "Product 2", price: 9.99 },
    { _id: "3", name: "Product 3", price: 12.99 },
    { _id: "4", name: "Product 4", price: 15.99 },
    { _id: "5", name: "Product 5", price: 18.99 },
  ];

//   Check if there is a token in cookies (you can use a library like js-cookie)
// use js-cookie to get the token from cookies
//   If no token, redirect to login page
//   If token exists, render the products page
    const navigate = useNavigate();
    useEffect( () => {
        const token = Cookies.get('jwt');
        console.log("Token in Products.jsx:", token);
        if ( !token ) {
            navigate('/login');
        }
    }, [] );

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Products</h1>
        <ul className="space-y-4">
          {products.map((product) => (
            <li key={product._id} className="bg-gray-100 p-4 rounded">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-600">Price: ${product.price}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Products;