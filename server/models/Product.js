import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String },
    image: { type: String }, // URL or path
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Product', productSchema);
