const router = require("express").Router();
const User = require("../models/User");
const cryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");

//Register
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: cryptoJs.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json("Can't add");
  }
});

//Login

router.post("/login", async (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      status: "error",
      error: "req body cannot be empty",
    });
  }
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(401).json("User not found!");

    const hashedPass = cryptoJs.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );

    const unHashedPass = hashedPass.toString(cryptoJs.enc.Utf8);

    unHashedPass !== req.body.password &&
      res.status(401).json("Wrong credentials!");

    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );

    const { password, ...others } = user._doc;
    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
