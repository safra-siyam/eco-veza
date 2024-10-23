import { Request, Response } from 'express';
import Seller from '../models/Seller';

// Controller to add a new seller
export const addSeller = async (req: Request, res: Response) => {
    try {
        const { name, email, storeName,password } = req.body;
        const newSeller = new Seller({ name, email, storeName,password });

        await newSeller.save();

        res.status(201).json({ message: "Seller added successfully", seller: newSeller });
    } catch (error) {
        res.status(500).json({ message: "Error adding seller", error });
    }
};

// Controller to get all sellers (optional)
export const getSellers = async (req: Request, res: Response) => {
    try {
        const sellers = await Seller.find();
        res.status(200).json(sellers);
    } catch (error) {
        res.status(500).json({ message: "Error fetching sellers", error });
    }
};
