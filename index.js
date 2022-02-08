const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const userStat = require("./routes/userStat");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true })
  .then(() => console.log("MongoDb connection successful!"))
  .catch((err) => {
    console.log(err);
  });

// const domainsFromEnv = process.env.CORS_DOMAINS || "";

// const whitelist = domainsFromEnv.split(",").map((item) => item.trim());
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin || whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true,
// };
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Working");
});
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoute);
app.use("/api/checkout", stripeRoute);
app.use("/api/stats", userStat);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running");
});
