import { ProductModel } from "../../models/admin/ProductModel.js";
import { ResponseMessage } from "../../utils/responseMessage.js";

const addProduct = async (req, res) => {
  try {
    const {
      tittle,
      description,
      price,
      discountPercentage,
      rating,
      stock,
      brand,
      category,
    } = req.body;
    console.log(req.files, 1);
    console.log(req.body, 2);
    //products-
    const productsAr = req.files.product_img.map((ele) => {
      return ele.filename;
    });
    //thumbnail

    const thumbnailOne = req.files.thumbnail[0].filename;
    let result = await ProductModel({
      tittle,
      description,
      price,
      discountPercentage,
      rating,
      stock,
      brand,
      category,
      thumbnail: thumbnailOne,
      product_img: productsAr,
    });
    let data = await result.save();
    console.log(data);
    if (data) {
      return res.status(201).send({
        product: data,
        message: "Product added successfully",
        status: 201,
      });
    }
  } catch (err) {
    return res.status(500).send({
      message: ResponseMessage.INTERNAL_SERVER_ERROR,
      status: 500,
      message: err.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.params.id);
    let deletedResult = await ProductModel.findByIdAndUpdate(
      { _id: id },
      { $set: { delete_status: true } }
    );
    if (deletedResult) {
      return res.status(200).send({
        status: 200,
        message: "Product deleted successfully",
        product: deletedResult,
      });
    } else {
      return res.status(401).send({
        status: 401,
        message: "Product not found",
      });
    }
  } catch (err) {
    return res.status(500).send({
      status: 500,
      message: ResponseMessage.INTERNAL_SERVER_ERROR,
      error: err.message,
    });
  }
};

const activeDeactiveProduct = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;
    console.log(req.params.id);
    let statusResult = await ProductModel.findByIdAndUpdate(
      { _id: id },
      { $set: { status: status } }
    );

    if (!statusResult) {
        return res.status(401).send({
          status: 401,
          message: "Please enter valid id",
        });
      }

      return res.status(200).send({
        status: 200,
        message: "Product status updated successfully",
      });
    


  } catch (err) {
    return res.status(500).send({
      status: 500,
      message: ResponseMessage.INTERNAL_SERVER_ERROR,
      error: err.message,
    });
  }
};

const getProduct = async (req, res) => {
  try {
    let result = await ProductModel.find({ delete_status: false });
    console.log(result.length, 55);
    if (result.length < 1) {
      return res
        .status(401)
        .send({ status: 401, message: "Product not found" });
    }
    if (result) {
      return res.status(200).send({
        status: 200,
        message: "Product fetch successfully",
        products: result,
      });
    }
  } catch (err) {
    return res
      .status(500)
      .send({ status: 500, message: ResponseMessage.INTERNAL_SERVER_ERROR });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;

    let result = await ProductModel.findOne({ _id: id });
    if (!result) {
      return res
        .status(401)
        .send({ status: 401, message: "Product not found" });
    }

    return res.status(200).send({
      status: 200,
      message: "Product fetch successfully",
      product: result,
    });
  } catch (err) {
    return res
      .status(500)
      .send({
        status: 500,
        message: ResponseMessage.INTERNAL_SERVER_ERROR,
        error: err.message,
      });
  }
};


export {
  addProduct,
  deleteProduct,
  activeDeactiveProduct,
  getProduct,
  getSingleProduct,
};
