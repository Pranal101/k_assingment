import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: String,
  price: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
  },
  images: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  category: {
    type: String,
    //required:true
  },
  stock: {
    type: Number,
    //required:true,
    default: 1,
  },
  numOfReciews: {
    type: Number,
    default: 0,
  },
  reviews: {
    name: {
      type: String,
      //required:true
    },
    rating: {
      type: Number,
      //required:true
    },
    comment: {
      type: String,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
