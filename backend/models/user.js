const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    require: true,
  },
  username: {
    type: String,
    unique: true,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  todo: [
    {
      type: mongoose.Types.ObjectId,
      ref: "todos",
    },
  ],
});
module.exports = mongoose.model("user", userSchema);
