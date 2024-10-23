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
    password: {
        type: String,
        required: true,
    }
});

const Seller = mongoose.model('Seller', SellerSchema);

export default Seller;
