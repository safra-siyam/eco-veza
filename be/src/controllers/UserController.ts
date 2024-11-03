import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Types } from 'mongoose';
import { User, IUser } from "../models/User";
import { sendPasswordEmail } from "../utils/Utils";

const generateToken = (id: Types.ObjectId) => {
    return jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
};

// Register new User with Buyer role
export const register = async (req: Request, res: Response) => {
    console.log('Create User body:', req.body);

    const { username, email, password, address, phone, userType = "Buyer" } = req.body;

    if (!username || !email || !password || !address || !phone || !userType) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Check if username already exists
        const userNameExists = await User.findOne({ username });
        if (userNameExists) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Create new user
        const user: IUser = new User({
            username,
            email,
            password,
            address,
            phone,
            userType,
        });
        await user.save();

        // Generate JWT token
        const token = generateToken(user._id);
        res.cookie('jwt', token, { httpOnly: false, secure: true, sameSite: 'none', maxAge: 3600000 });

        // Send response
        res.status(201).json({ message: 'User registered successfully', user: { username: user.username, email: user.email, type: user.userType } });
    } catch (error) {
        console.error('Error during user registration:', error);
        res.status(400).json({ message: 'An error occurred during registration' });
    }
};

// Login user
export const login = async (req: Request, res: Response) => {
    console.log('Login body:', req.body);

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = generateToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 });

        // Send response
        res.status(200).json({ message: 'Login successful', user: { username: user.username, email: user.email, type: user.userType } });

    } catch (error) {
        console.error('Error during user login:', error);
        res.status(500).json({ message: 'An error occurred during login' });
    }
};

// Logout user
export const logout = async (req: Request, res: Response) => {
    res.clearCookie('jwt', { httpOnly: true });
    return res.status(200).json({ message: 'Successfully logged out' });
};

// Get user profile
export const createSeller = async (req: Request, res: Response) => {


    //here we are creating a new seller
    console.log('Create Seller body:', req.body);

    const { name, email, phone, storeName, address, userType = "Seller" } = req.body;

    // Function to generate a random 7-character password
    const generatePassword = (length: number) => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let password = '';
        for (let i = 0; i < length; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return password;
    };

    const username = name;
    const storeId = storeName;
    const password = generatePassword(7);
    if (!username || !email || !password || !address || !phone || !userType || !storeName) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Check if username already exists
        const userNameExists = await User.findOne({ username });
        if (userNameExists) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Check if username already exists
        const storeNameExists = await User.findOne({ storeId });
        if (storeNameExists) {
            return res.status(400).json({ message: 'Store Name already exists' });
        }

        // Create new user
        const user: IUser = new User({
            username,
            email,
            password,
            address,
            phone,
            userType,
            storeId,
        });
        await user.save();

        var url = await sendPasswordEmail(username, email, password);

        // Send response
        res.status(201).json({ message: 'Seller registered successfully', user: { username: user.username, email: user.email, type: user.userType, url: url } });
    } catch (error) {
        console.error('Error during seller registration:', error);
        res.status(400).json({ message: 'An error occurred during registration' });
    }
}