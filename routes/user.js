const router = require("express").Router();
const {
  veriftyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const User = require("../models/User");

// Change User username
router.put("/:id", veriftyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = cryptoJs.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(201).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete User
router.delete("/:id", veriftyTokenAndAuthorization, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    req.status(203).json("User has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get User
router.get("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});
// Get All Users
router.get("/", async (req, res) => {
  const query = req.query.new;

  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get User Stats
module.exports = router;
