import { AuthRequest } from '../middleware/authMiddleware';
import { Request, Response } from "express";
import Item from "../models/Product"; 
import { Types } from 'mongoose';

// Controller to create a new saleItem
export const addItem = async (req: Request, res: Response) => {
    const { productName, description, price, stock } = req.body;
    // Need to add seller ID
    const sellerId = (req as AuthRequest).user?._id;
    console.log(sellerId);
    // Check if all required fields are provided
    if (!productName || !description || !price || !stock) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Create new item
        const item = new Item({
            productName, 
            description, 
            price, 
            stock,
            sellerId,
        });

        // Save the item to the database
        await item.save();

        // Send success response
        res.status(201).json({ message: 'item added successfully', item });
    } catch (error) {
        console.error('Error adding item:', error);
        res.status(500).json({ message: 'An error occurred while adding the item' });
    }
};

export const getAllItems = async (req: Request, res: Response) => {
    try {
        // Find all items
        const item = await Item.find();
        // Send success response
        res.status(200).json({ item });
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).json({ message: 'An error occurred while fetching the items' });
    }
}

export const getItemById = async (req: Request, res: Response) => {
    const { id } = req.params; 

    try {
        const item = await Item.findById({ _id: id });

        // If the item is not found
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // Send success response
        res.status(200).json({ item });
    } catch (error) {
        console.error('Error fetching item:', error);
        res.status(500).json({ message: 'An error occurred while fetching the item' });
    }
}

export const getItemBySellerId = async (req: Request, res: Response) => {
    const { sellerId } = req.params;

    try {
        // Find all items by sellerId
        const item = await Item.find({ sellerId });

        // Send success response
        res.status(200).json({ item });
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).json({ message: 'An error occurred while fetching the items' });
    }
}

// Controller to update an existing item
export const updateItem = async (req: Request, res: Response) => {
    const { ProductID } = req.params; // Get ProductID from the URL params
    console.log(`Request Body : ${JSON.stringify(req.body)}`)
    const { productName, description, price, stock } = req.body;

    // Check if ProductID is provided
    if (!ProductID) {
        return res.status(400).json({ message: 'ProductID is required' });
    }
    console.log(`Product ID : ${ProductID}`)
    try {

        // Create an update object dynamically based on fields provided in the request body
        const updateFields: any = {};
        if (productName !== undefined) updateFields.productName = productName;
        if (description !== undefined) updateFields.description = description;
        if (price !== undefined) updateFields.price = price;
        if (stock !== undefined) updateFields.stock = stock;

        console.log(`Fields To Update : ${JSON.stringify(updateFields)}`)

        // Find the item by ProductID and update it with the provided data
        const updatedItem = await Item.findOneAndUpdate(
            { _id: new Types.ObjectId(ProductID) }, // Filter
            { $set: updateFields }, // Update data
            { new: true } // Return the updated document
        );

        // If the item is not found
        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // Send success response
        res.status(200).json({ message: 'Item updated successfully', item: updatedItem });
    } catch (error) {
        console.error('Error updating item:', error);
        res.status(500).json({ message: 'An error occurred while updating the item' });
    }
};

// Delete a item by ProductID
export const deleteItem = async (req: Request, res: Response) => {
    try {
        const { ProductID } = req.params; // Ensure the parameter name matches the route

        // Find and delete the item
        const deletedItem = await Item.findOneAndDelete({ _id: new Types.ObjectId(ProductID) });

        if (!deletedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.status(200).json({ message: 'Item deleted successfully', item: deletedItem });
    } catch (error) {
        console.error('Error deleting item:', error);
        res.status(500).json({ message: 'An error occurred while deleting the item' });
    }
};