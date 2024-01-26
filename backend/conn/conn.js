const { request, response } = require("express");
const mongoose = require("mongoose");

const conn = async (request, response) => {
  try {
    await mongoose
      .connect(
        "mongodb+srv://srujana:srujanatodo@tododata.txq8cgh.mongodb.net/"
      )
      .then(() => {
        console.log("connected");
      });
  } catch (error) {
    res.send(400).json({ message: "not connected" });
    console.log(error);
  }
};
conn();
