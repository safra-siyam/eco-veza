// models/Seller.ts
import mongoose from 'mongoose';

const SellerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    storeName: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Seller = mongoose.model('Seller', SellerSchema);

export default Seller;
