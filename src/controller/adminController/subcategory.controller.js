import { subcategoryModel } from "../../models/admin/SubcategoryModel.js";

const addSubcategory = async (req, res) => {
  const { category_id, subcategory_name } = req.body;
  try {
    if (!category_id || !subcategory_name|| category_id.trim() === "" || subcategory_name.trim() === "") {
      return res.status(400).send({ message: "Please enter valid data" });
    }
    let checkExist=await subcategoryModel.findOne({subcategory_name:subcategory_name});
    if(checkExist){
      return res.status(401).send({ message: "Sub category already exist" });
    }
    let data = await subcategoryModel({ category_id, subcategory_name });
    let result = await data.save();
    if (result) {
      return res
        .status(200)
        .send({ message: "Sub category added successfully", data: result });
    }
  } catch (err) {
    return res.status(500).send({ message: "Internal server error",error:err.message });
  }
};

export { addSubcategory };
