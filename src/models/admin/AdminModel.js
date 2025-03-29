import mongoose from "mongoose";

const adminSchema =  mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    otp: {
      type: String,
      default:null,
      require:false
    },
    deleteStatus: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

export const AdminModal = mongoose.model("admin", adminSchema);
