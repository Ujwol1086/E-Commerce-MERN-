import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const reviewSchema = mongoose.Schema(
    {
        name: { type: String, required: false },
        rating: { type: Number, required: false },
        comment: { type: String, required: false },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
    },
    { timestamps: true }
);

const productSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        image: { type: String, required: false },
        brand: { type: String, required: false },
        quantity: { type: Number, required: false },
        category: { type: String, required: false },
        description: { type: String, required: false },
        reviews: [reviewSchema],
        rating: { type: Number, required: false, default: 0 },
        numReviews: { type: Number, required: false, default: 0 },
        price: { type: Number, required: false, default: 0 },
        countInStock: { type: Number, required: false, default: 0 },
    },
    { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
