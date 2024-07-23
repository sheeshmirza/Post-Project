const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [1, "Title must be at least 1 character long"],
      maxlength: [100, "Title cannot be more than 100 characters long"],
    },
    desc: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minlength: [1, "Description must be at least 1 character long"],
      maxlength: [5000, "Description cannot be more than 5000 characters long"],
    },
    image: {
      type: String,
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
