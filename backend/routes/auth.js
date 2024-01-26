const User = require("../models/user");
const router = require("express").Router();
const bcrypt = require("bcrypt");
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userCheck = await User.findOne({ email });
    if (!userCheck) {
      res.status(200).json({ message: "please create an account" });
    }
    const passwordCompare = await bcrypt.compare(password, userCheck.password);
    if (passwordCompare) {
      const { password, ...others } = userCheck._doc;
      res.status(200).json({ others });
    } else {
      res.status(200).json({ message: "Incorrect Password" });
    }
  } catch (error) {
    res.status(200).json({ message: "something went wrong" });
  }
});
// Registration endpoint

router.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    console.log(username);
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      username,
      password: hashPassword,
    });
    await newUser.save().then(() => {
      res.status(201).json({ message: "create user successfully" });
    });
  } catch (error) {
    res.status(400).json({ message: "User or Email Already Exists" });
  }
});

// Get all registered users endpoint
// router.get("/users", async (req, res) => {
//   try {
//     const users = await User.find({});
//     res.status(200).json(users);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

module.exports = router;
