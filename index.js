const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDb connection successful!"))
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.listen(5000, () => {
  console.log("Server is running");
});
