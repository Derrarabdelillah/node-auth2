import axios from "axios";
import Cookies from 'js-cookie'
import { useNavigate, Link } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();

    const URL = 'http://localhost:3000/api';
    const handleLogout = async () => {
        const res = await axios.get(`${URL}/logout`, { withCredentials: true });
        if (res.status === 200) {
            navigate('/login');
        }
        navigate('/');
    }

    const token = Cookies.get('jwt');

    return (
        <header className="bg-gray-800 text-white p-4 flex justify-between">
            <div className="flex items-center">
                <nav>
                <span className="mr-4">Logo</span>
                    <Link to="/home" className="mr-4">Home</Link>
                    <Link to="/products" className="mr-4">Products</Link>
                    <Link to="/" className="mr-4">App.jsx</Link>
                </nav>
            </div>
            <div className="flex items-center">
                { !token && <button onClick={() => navigate('/login')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">Login</button> }
                { !token && <button onClick={() => navigate('/')} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4">Create an Account</button> }
                { token && <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Logout</button> }
            </div>
        </header>
    );
}

export default Header;