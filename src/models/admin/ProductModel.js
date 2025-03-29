import mongoose from "mongoose";

let productSchema =  mongoose.Schema(
  {
    tittle: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    discountPercentage: {
      type: Number,
      require: true,
    },
    rating: {
      type: Number,
      require: true,
    },
    stock: {
      type: Number,
      require: true,
    },
    brand: {
      type: String,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    thumbnail: {
      type: String,
      require: true,
    },
    product_img: {
      type: Array,
      require: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    delete_status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export let ProductModel = mongoose.model("products", productSchema);
