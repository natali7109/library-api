const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    trim: true,
  },
  lastname: {
    type: String,
    required: true,
    minlength: 2,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    minlength: 5,
    unique: true,
    trim: true,
  },
  borrowedBooks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
