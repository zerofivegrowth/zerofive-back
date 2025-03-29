import mongoose from "mongoose";

const SubCategorySchema = mongoose.Schema({
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
    require: true,
  },
  subcategory_name:{
    type:String,
    require:true
  },
  delete_status:{
    type:Boolean,
    default:false
  }
},{timestamps:true});

export const subcategoryModel=mongoose.model("subcategory",SubCategorySchema)

