import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// ------hash password--------
let hashPassword = (password) => {
  return bcrypt.hash(password, 10);
};

let validatePassword = (password, hashPass) => {
    
  return bcrypt.compare(password, hashPass);
};
export { hashPassword, validatePassword };

// ----------jwt----------


export const genToken=(userIdobj)=>{
  return  jwt.sign(userIdobj, process.env.JWT_SECRET_KEY, {
        expiresIn: "1h",
      });
}

// ------------getOTP-----------
export const generateRandomNumber=()=> {
  return Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
}
