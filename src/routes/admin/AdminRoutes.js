import router from "express"
import { changePassword, createAdmin, forgetPassword, getAdmin, loginAdmin, verifyOtp } from "../../controller/adminController/Admin.controller.js";
import { verifyToken } from "../../middleware/auth.js";
import { activeDeactiveProduct, addProduct, deleteProduct, getProduct, getSingleProduct } from "../../controller/adminController/Product.controller.js";
import { productUploadStorage } from "../../middleware/multer.js";
import { addCategory, deleteCategory, getCategory, getSingleCategory, updateCategory } from "../../controller/adminController/category.controller.js";
import { addSubcategory } from "../../controller/adminController/subcategory.controller.js";
let adminRoutes=router();


//AUTH-->
adminRoutes.post("/create-admin",createAdmin)
adminRoutes.post("/login-admin",loginAdmin)
adminRoutes.get("/get-admin",verifyToken,getAdmin)//token header auth
adminRoutes.post("/forget-password-admin",forgetPassword)
adminRoutes.post("/otp-verify",verifyToken,verifyOtp)//token header auth
adminRoutes.post("/change-password",verifyToken,changePassword) //token header auth 

//PRODUCT-->
adminRoutes.post("/delete-product/:id",verifyToken,deleteProduct) //token header auth 
adminRoutes.get("/get-product",verifyToken,getProduct) //token header auth 
adminRoutes.get("/get-single-product/:id",verifyToken,getSingleProduct) //token header auth 
adminRoutes.post("/active-deactive-product/:id",verifyToken,activeDeactiveProduct) //token header auth 
adminRoutes.post("/add-product",verifyToken,productUploadStorage.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'product_img', maxCount: 10 }]),addProduct) //token header auth 

//CATEGORY-->
adminRoutes.post("/add-category",verifyToken,addCategory)
adminRoutes.post("/delete-category/:id",verifyToken,deleteCategory)
adminRoutes.post("/update-category/:id",verifyToken,updateCategory)
adminRoutes.get("/get-single-category/:id",verifyToken,getSingleCategory)
adminRoutes.get("/get-category",verifyToken,getCategory)

//SUBCATEGORY-->
adminRoutes.post("/add-subcategory",addSubcategory)



export {adminRoutes}