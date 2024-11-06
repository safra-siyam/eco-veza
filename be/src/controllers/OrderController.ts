import { Request, Response } from "express";
import { Order } from "../models/Order";
import { v4 as uuidv4 } from 'uuid';
import { calculateTotalAmount } from "../utils/Utils";
import jwt from 'jsonwebtoken';
import { User } from "../models/User";
import mongoose, { Types } from "mongoose";
import Item from "../models/Product";

// Generate a unique OrderID
const generateOrderID = () => {
    return uuidv4(); // Generates a unique ID
};

// Create a new order
export const createOrder = async (req: Request, res: Response) => {
    try {

        console.log(`Order ${req.body}`)
        const { paymentid, status, amount, items } = req.body;

        // Get Buyer
        const token = req.cookies.jwt;
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: Types.ObjectId };
        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(401).json({ message: "Invalid User" });
        }

        // Check if all required fields are provided
        if (!paymentid || !status || !amount || !items) {
            return res.status(400).json({ message: 'Missing Fields' });
        }

        // Create a new order
        const BuyerID=user.id;
        const OrderDate=Date.now()
        const _id =  new mongoose.Types.ObjectId();
        const order = new Order({
            _id,
            paymentid,
            status,
            amount,
            items,
            BuyerID,
            OrderDate
        });
        
        // Reduce Stocks
        order.items.forEach(async (item)=>{
            var remaining:number =item.stock - item.addToCartQuantity;
            const itemInDB = await Item.findById(item._id);
            if(!itemInDB){
                throw new Error("Item Mismatches Found")
            }else{
                itemInDB.stock = remaining<0?0:remaining;
                itemInDB.save();
            }
        })

        await order.save();

        res.status(201).json({ message: 'Order created successfully', order });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'An error occurred while creating the order' });
    }
};

export const getMyOrders = async (req: Request, res: Response) => {
    try {

         // Get Buyer
         const token = req.cookies.jwt;
         const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: Types.ObjectId };
         const user = await User.findById(decoded.id).select('-password');
         if (!user) {
             return res.status(401).json({ message: "Invalid User" });
         }

        console.log("Fetching . . .")
        const orders = await Order.find();
        
        //here we are filtering the orders based on the buyerId and then we are formatting the date and then we are sending the response because we need to send the response in the format that is required by the frontend so that it can be easily displayed
        var data:Object[] = [];
        orders.forEach((order)=>{
            const formattedDate = new Date(String(order.OrderDate)).toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true
              });
            var OrderDate = formattedDate;
            var BuyerId = order.BuyerID;
            var status = order.status;
            order.items.forEach((item)=>{
                if(item.sellerId==user.id){
                    data.push(
                        {
                            "BuyerId":BuyerId,
                            "status":status,
                            "OrderDate":OrderDate,
                            "productName":item.productName,
                            "price":item.price,
                            "addToCartQuantity":item.addToCartQuantity
                        }
                    )
                }
            })

        })

        res.set('Cache-Control', 'no-store');
        
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error });
    }
};



