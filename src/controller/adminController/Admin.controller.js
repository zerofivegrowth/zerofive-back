import { AdminModal } from "../../models/admin/AdminModel.js";
import { ResponseMessage } from "../../utils/responseMessage.js";
import nodemailer from "nodemailer";

import {
  genToken,
  generateRandomNumber,
  hashPassword,
  validatePassword,
} from "../../utils/securePassword.js";
import { transporter } from "../../config/Email.config.js";

const createAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    let resu = await AdminModal.findOne({ email: email });
    console.log(resu, 22);
    if (resu) {
      return res
        .status(400)
        .send({ message: "admin already exist", status: 400 });
    }

    let pass = await hashPassword(password);

    let result = await AdminModal({ email, password: pass });
    let data = result.save();
    if (data) {
      return res
        .status(201)
        .send({ message: ResponseMessage.ADMIN_CREATED, status: 201 });
    }
  } catch (err) {
    return res.status(500).send({
      message: ResponseMessage.INTERNAL_SERVER_ERROR,
      status: 500,
      error: err.message,
    });
  }
};

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await AdminModal.findOne({ email });
    let hasP = user.password;
    let pas = await validatePassword(password, hasP);
    if (user && pas) {
      let payload = { userId: user._id };

      let token = genToken(payload);

      return res
        .status(200)
        .send({ message: "login success", status: 200, token: token, user });
    } else {
      return res.status(404).send({ message: "User not found", status: 404 });
    }
  } catch (err) {
    return res.status(500).send({
      message: ResponseMessage.INTERNAL_SERVER_ERROR,
      status: 500,
      error: err.message,
    });
  }
};

const forgetPassword = async (req, res) => {
  const { email } = req.body;
  let user = await AdminModal.findOne({ email });
  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }
  if (user) {
    let payload = { userId: user._id };
    let token = genToken(payload);

    let otp = generateRandomNumber();
    console.log(otp, 111);
    console.log(token, 222);

    var mailOptions = {
      from: "parmanandkumawat.vhits@gmail.com",
      to: user.email,
      subject: "forget password",
      text: `This is your otp ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res
          .status(500)
          .send({ error: "Error sending OTP email", message: error.message });
      }
      if (info) {
        AdminModal.findByIdAndUpdate(
          { _id: user._id },
          { $set: { otp: otp } },
          { new: true }
        )
          .then((reslt) => {
            if (reslt) {
              return res
                .status(200)
                .send({ message: "OTP email sent successfully, check email" });
            }
          })
          .catch((err) => {
            return res
              .status(500)
              .send({ error: "Error updating OTP", message: err.message });
          });
      }
    });
  }
};

const verifyOtp = async (req, res) => {
  try {
    let userInputOtp = req.body.otp;
    const { userId } = req;
    //  console.log(userId,66)
    //  console.log(userInputOtp,"userOTP")
    let data = await AdminModal.findOne({ _id: userId });
    console.log(data, 88);
    if (data) {
      if (data.otp === userInputOtp) {
        return res.status(200).send({ status: 200, message: "User verified" });
      } else {
        return res
          .status(400)
          .send({ status: 400, message: "Invalid otp please try again !!" });
      }
    }
  } catch (err) {
    return res.status(500).send({
      status: 500,
      message: ResponseMessage.INTERNAL_SERVER_ERROR,
      error: err.message,
    });
  }
};

const getAdmin = async (req, res) => {
  console.log(req.userId, 56);
  const data = await AdminModal.find();
  if (data) {
    return res.status(200).send({ user: data, message: "User fetch" });
  }
};

const changePassword = async (req, res) => {
  try {
    let UserID = req.userId;
    const { newPassword, oldPassword } = req.body;
    let data = await AdminModal.findOne({ _id: UserID });
    console.log(data,1)
    console.log(data.password,2)

    if (data) {
    let validPass= await validatePassword(oldPassword,data.password);
    let pass = await hashPassword(newPassword);
    console.log(validPass,"validPass")
      if (validPass) {
        await AdminModal.findByIdAndUpdate(
          { _id: UserID },
          {
            $set: { password: pass },
          },
          { new: true }
        )
          .then((result) => {
            if (result) {
              return res
                .status(200)
                .send({ message: "Change password successfully" });
            }
          })
          .catch((errr) => {
            if (errr) {
              return res.status(401).send({ message: "password change error" });
            }
          });
      } else {
        return res.status(400).send({ message: "Old password is invalid" });
      }
    }
  } catch (err) {
    return res.status(500).send({ message: ResponseMessage.INTERNAL_SERVER_ERROR,status:500 });

  }
};

export {
  createAdmin,
  loginAdmin,
  forgetPassword,
  getAdmin,
  verifyOtp,
  changePassword,
};
