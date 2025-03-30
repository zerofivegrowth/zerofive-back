import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { adminRoutes } from "./src/routes/admin/AdminRoutes.js";
import { dbConnect } from "./src/config/dbconnect.js";
import { userRoutes } from "./src/routes/user/UserRoutes.js";

// Initialize app
const app = express();

// Middleware for static files (images)
app.use('/images', express.static('./public'));

// CORS configuration (adjust for production as needed)
app.use(cors({ origin: '*' }));  // Allow all origins for now

// Load environment variables
dotenv.config();

// Connect to the database with error handling
dbConnect()
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
    process.exit(1); // Exit the process if DB connection fails
  });

// Set the port
let PORT = process.env.PORT || 5000;

// Middleware to parse incoming requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Route handlers
app.use("/api/admin/", adminRoutes);
app.use("/api/user/", userRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
