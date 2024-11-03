import { Request, Response } from 'express';
import Payment from '../models/Payment';
import { Order } from '../models/Order';
import Stripe from 'stripe';

//here a new instance of stripe is created with the secret key
//stripe is a payment gateway that allows you to accept payments online and in mobile apps
const stripe = new Stripe('sk_test_51PrHd9Rxa5Loq6IRHlY17Wt8b5HUfssOiRWU2w79eGHFx6I7iiu5HvPqNYnna6cawXiwQGWQLZ3ZhI7F4mE9Rb5z00LWY9Ikco');

export const createPayment = async (req: Request, res: Response) => {
    const { amount } = req.body;
  
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        //here it is converted to cents
        amount: amount * 100,
        currency: 'usd',
      });
      console.log(paymentIntent)
      res.json({
        data: paymentIntent,
      });
    } catch (error) {
      res.status(500).json({ message: "Payment failed" });
    }
};
