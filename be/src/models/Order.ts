import { Schema, model, Document } from 'mongoose';

interface ICartProduct {
    _id: string; 
    productName: string;
    description: string; 
    price: number;
    stock: number; 
    sellerId: string; 
    addToCartQuantity: number; 
}

interface IOrder extends Document {
    _id: Schema.Types.ObjectId; 
    paymentid: string; 
    status: string;
    amount: number; 
    items: ICartProduct[];
    BuyerID: Schema.Types.ObjectId; 
    OrderDate: Schema.Types.Date;
}

const productSchema = new Schema<ICartProduct>({
    _id: { type: String, required: true },
    productName: { type: String, required: true },
    description: { type: String, required: true }, 
    price: { type: Number, required: true },
    stock: { type: Number, required: true }, 
    sellerId: { type: String, required: true }, 
    addToCartQuantity: { type: Number, required: true }
});

const orderSchema = new Schema<IOrder>({
    _id: { type: Schema.Types.ObjectId, required: true },
    paymentid: { type: String, required: true, unique: true }, 
    status: { type: String, enum: ['PAID', 'PENDING', 'DELIVERED'], default: 'PAID' },
    amount: { type: Number, required: true }, 
    items: [productSchema],
    BuyerID: { type: Schema.Types.ObjectId, ref: 'Buyer', required: true },
    OrderDate: { type: Date, required: true }, 
});

export const Order = model<IOrder>('Order', orderSchema);
