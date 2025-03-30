import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import { adminRoutes } from "./src/routes/admin/AdminRoutes.js";
import { dbConnect } from "./src/config/dbconnect.js";
import { userRoutes } from "./src/routes/user/UserRoutes.js";
const app=express();

app.use('/images', express.static('./public'));

app.use(cors({ origin: 'http://127.0.0.1:3000' }))
dotenv.config();
dbConnect()
let PORT=process.env.PORT || 5000
app.use(express.urlencoded({extended:true}))
app.use(express.json());

app.use("/api/admin/",adminRoutes);
app.use("/api/user/",userRoutes);



app.listen(PORT,()=>{console.log(`http://localhost:${PORT}`)})






