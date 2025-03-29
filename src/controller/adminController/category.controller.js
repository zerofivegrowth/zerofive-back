import { CategoryModel } from "../../models/admin/CategoryModel.js";
import { ResponseMessage } from "../../utils/responseMessage.js";

const addCategory = async (req, res) => {
  try {
    const { category_name } = req.body;

    let duplicateCategory=await CategoryModel.findOne({category_name});

    if(duplicateCategory){
        return res
        .status(400)
        .send({ status: 400, message: "Category already exist" });
    }

    const result = await CategoryModel({category_name});
    let data = await result.save();

    if (!data) {
      return res
        .status(401)
        .send({ status: 401, message: "Category not addedd ERROR !" });
    }

    if (data) {
      return res
        .status(201)
        .send({ status: 201, message: "Category added successfully",category:data });
    }
  } catch (err) {
    return res
      .status(500)
      .send({ status: 500, message: ResponseMessage.INTERNAL_SERVER_ERROR ,error:err.message});
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(401)
        .send({ status: 401, message: "Please enter valid id" });
    }
    let result = await CategoryModel.findByIdAndUpdate(
      { _id: id },
      { $set: { delete_status: true } }
    );

    if (result) {
      return res
        .status(200)
        .send({ status: 200, message: "Category deleted successfully" });
    }
  } catch (err) {
    return res
      .status(500)
      .send({ status: 500, message: ResponseMessage.INTERNAL_SERVER_ERROR });
  }
};

const getCategory = async (req, res) => {
  try {
    let result = await CategoryModel.find({ delete_status: false });
    if (!result) {
      return res
        .status(401)
        .send({ status: 401, message: "Category not fond" });
    }
    return res.status(200).send({
      status: 200,
      message: "Category fetch successfully",
      category: result,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ status: 500, message: ResponseMessage.INTERNAL_SERVER_ERROR });
  }
};

const getSingleCategory = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(401)
        .send({ status: 401, message: "Please enter valid id" });
    }
    let result = await CategoryModel.findOne({ _id: id });

    if (!result) {
      return res
        .status(404)
        .send({ status: 404, message: "Category not found" });
    }

    return res.status(200).send({
      status: 200,
      message: "Category deleted successfully",
      category: result,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ status: 500, message: ResponseMessage.INTERNAL_SERVER_ERROR });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(401)
        .send({ status: 401, message: "Please enter valid id" });
    }

    let result = await CategoryModel.findByIdAndUpdate(
      { _id: id },
      { $set: { ...req.body } }
    );

    if (!result) {
      return res
        .status(401)
        .send({ status: 401, message: "Entered data is invalid" });
    }

    return res
        .status(200)
        .send({ status: 200, message: "Category updated successfully" });
  } catch (err) {
    return res
      .status(500)
      .send({ status: 500, message: ResponseMessage.INTERNAL_SERVER_ERROR });
  }
};

export {
  addCategory,
  deleteCategory,
  getCategory,
  getSingleCategory,
  updateCategory,
};
