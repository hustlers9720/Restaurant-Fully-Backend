import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const registerController = async (req, res) => {
    try {
        const { username, password, email, phone, address, answer } = req.body;

        // Validate request body
        if (!email || !password || !username || !address || !phone || !answer) {
            return res.status(400).send({
                success: false,
                message: 'All fields (email, password, username, phone, address) are required.'
            });
        }

        // Check if the user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).send({
                success: false,
                message: 'User already exists. Please login.'
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await userModel.create({
            username,
            email,
            password: hashedPassword,
            address,
            phone,
            answer,
        });

        // Generate JWT token after user is created
        // const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        return res.status(201).send({
            success: true,
            message: 'User registered successfully',
            
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).send({
            success: false,
            message: 'Error in registration',
            error: error.message
        });
    }
};

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User does not exist'
            });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        return res.status(200).send({
            success: true,
            message: 'Login successful',
            token
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send({
            success: false,
            message: 'Error in login',
            error: error.message
        });
    }
};

export { registerController, loginController };
