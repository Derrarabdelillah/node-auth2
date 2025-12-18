import User from "../Models/User.js";
import jwt from "jsonwebtoken";

// handle Errors
const handleError = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };

    // incorrect email
    if ( err.message === "Incorrect email" ) {
        errors.email = "That email is not registered.";
    };

    // incorrect password
    if ( err.message === "Incorrect password" ) {
        errors.password = "That password is incorrect.";
    };

    // duplicate error code
    if (err.code === 11000) {
        errors.email = "Email is already registered.";
        return errors;
    }

    // validation errors
    if (err.message.includes('User validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
}

const maxAge = 3 * 24 * 60 * 60; // 3 days in seconds
const SECRET_KEY = "Abdou_SecretKey123"

const createToken = (id) => {
    return jwt.sign({ id }, SECRET_KEY, { expiresIn: maxAge })
}

const signup = async (req, res) => {
    const { email, password } = req.body;

    try {
        const isEmailTaken = await User.findOne({ email });

        if (isEmailTaken) {
            return res.status(400).json({ message: "Email is already registered." });
        } else {
            const user = await User.create({ email, password });
            const token = createToken(user._id);
            res.cookie('jwt', token, { 
            maxAge: maxAge * 1000,
            sameSite: 'lax', // or 'none' if using HTTPS
            secure: false    // set to true in production with HTTPS
        });    
            return res.status(201).json({ message: "User registered successfully.", user: user._id });
        }

    } catch (err) {
        const errors = handleError(err);
        return res.status(500).json({ errors });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { 
        maxAge: maxAge * 1000,
        sameSite: 'lax', // or 'none' if using HTTPS
        secure: false    // set to true in production with HTTPS
    });  
        res.status(200).json({ user: user._id });
    } catch (error) {
        const errors = handleError(error);
        res.status(400).json({ errors });
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({ message: "Users retrieved successfully.", users });
    } catch (error) {
        res.status(500).json({ message: "Internal server error." });
    }
}

const logout = async (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.status(200).json({ message: "Logged out successfully." });
}

export { signup, login, logout, getUsers };