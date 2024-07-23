const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    unique: true,
    trim: true,
    minlength: [1, "Name must be at least 1 character long"],
    maxlength: [100, "Name cannot be more than 100 characters long"],
  },
});

module.exports = mongoose.model("Tag", tagSchema);
