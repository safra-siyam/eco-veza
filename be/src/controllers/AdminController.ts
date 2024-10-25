import { Request, Response } from 'express';
import Seller from '../models/Seller';

// Controller to add a new seller
export const addSeller = async (req: Request, res: Response) => {
    try {
        const { name, email, storeName } = req.body;

        // Function to generate a random 7-character password
        const generatePassword = (length: number) => {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let password = '';
            for (let i = 0; i < length; i++) {
                password += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return password;
        };

        const password = generatePassword(7);

        const newSeller = new Seller({ name, email, storeName, password });

        await newSeller.save();

        res.status(201).json({ message: 'Seller added successfully', seller: newSeller });
    } catch (error) {
        res.status(500).json({ message: 'Error adding seller', error });
    }
};

// Controller to get all sellers
export const getSellers = async (req: Request, res: Response) => {
    try {
        const sellers = await Seller.find();
        res.status(200).json(sellers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching sellers', error });
    }
};

// Controller to delete a seller
export const deleteSeller = async (req: Request, res: Response) => {
    try {
        const sellerId = req.params.id;
        const deletedSeller = await Seller.findByIdAndDelete(sellerId);

        if (!deletedSeller) {
            return res.status(404).json({ message: 'Seller not found' });
        }

        res.status(200).json({ message: 'Seller removed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error removing seller', error });
    }
};
