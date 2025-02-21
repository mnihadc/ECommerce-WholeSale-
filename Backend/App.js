import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./Routes/Auth.route.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully!");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
app.use("/api/auth", authRoutes);
app.listen(port, () => {
  console.log(`Server is Running on port ${port}!!!`);
});
