require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const errorHandler = require("./middlewares/errorHandler");
const postRoutes = require("./routers/post");

const app = express();

app.use(express.json());
app.use(errorHandler);
app.use("/posts", postRoutes);

mongoose
  .connect(process.env.MONGODB_URI, { dbName: "posts" })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
