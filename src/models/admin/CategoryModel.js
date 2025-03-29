import mongoose from "mongoose";

const categorySchema =  mongoose.Schema(
  {
    category_name: {
      type: String,
      required: true,
    },
    delete_status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export let CategoryModel =  mongoose.model("category", categorySchema);
