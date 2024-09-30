import { Schema, model, Types, Document } from 'mongoose';

interface ISaleItem extends Document {
    productName: string;
    description: string;
    price: number;
    stock: number;
    sellerId: Types.ObjectId;
}

const saleitemSchema = new Schema<ISaleItem>({
    productName: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    sellerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

const Item = model<ISaleItem>('Item', saleitemSchema);

export default Item;
