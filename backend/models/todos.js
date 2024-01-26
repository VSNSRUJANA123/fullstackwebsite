const mongoose = require("mongoose");
const todoSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      require: true,
    },
    user: [
      {
        type: mongoose.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("todos", todoSchema);
