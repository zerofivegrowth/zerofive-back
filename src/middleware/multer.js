import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadFolder = "";
    if (file.fieldname === "thumbnail") {
      uploadFolder = "public/assets/images/thumbnail/";
    } else if (file.fieldname === "product_img") {
      uploadFolder = "public/assets/images/products";
    }
    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-product-" + file.originalname);
  },
});


export const productUploadStorage = multer({ storage: storage });
