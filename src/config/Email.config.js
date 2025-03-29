import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    port:465,
    auth: {
      user: "parmanandkumawat.vhits@gmail.com",
      pass: "igmqvkplxyolxscl",
    },
  });