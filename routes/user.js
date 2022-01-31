const router = require("express").Router();

router.get("/usertest", (req, res) => {
  res.send("User test is successful");
});

module.exports = router;
