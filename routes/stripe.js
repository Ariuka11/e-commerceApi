const router = require("express").Router();
const stripe = require("stripe")(
  "sk_test_51KOPI1FcUjrMmyO1GFgnaRqJAWTDy3ajU8X4MAwuCuQb68uFfUbt8VYDoYL3Hc4LGjdfxxn7Qtua7GwaJ5HusNUC00uwpQNX7A"
);

router.post("/payment", (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});

module.exports = router;
