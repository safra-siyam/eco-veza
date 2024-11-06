import { Request, Response } from 'express';
import { User } from '../models/User';
import { Order } from '../models/Order';

// Controller to get all sellers
export const getSellers = async (req: Request, res: Response) => {
    try {
        console.log("Fetching . . .")
        const sellers = await User.find({ userType: "Seller" });
        res.set('Cache-Control', 'no-store');
        
        res.status(200).json(sellers);
    } catch (error) {
        res.status(500).json({ message: "Error fetching sellers", error });
    }
};
export const getBuyers = async (req: Request, res: Response) => {
    try {
        console.log("Fetching . . .")
        const sellers = await User.find({ userType: "Buyer" });
        res.set('Cache-Control', 'no-store');
        
        res.status(200).json(sellers);
    } catch (error) {
        res.status(500).json({ message: "Error fetching buyers", error });
    }
};

export const getOrders = async (req: Request, res: Response) => {
    try {
        console.log("Fetching . . .");
        const orders = await Order.find();

        // Adjust the amount directly
        const modifiedOrders = orders.map(order => {
            order.amount = order.amount / 100;
            return order;
        });

        res.set('Cache-Control', 'no-store');
        res.status(200).json(modifiedOrders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error });
    }
};
