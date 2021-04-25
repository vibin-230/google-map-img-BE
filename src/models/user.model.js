const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: String,
    password: String,
    img: String,
  },
  { timestamps: true }
);

module.exports = {
  userSchema: mongoose.model("user", userSchema),
};
