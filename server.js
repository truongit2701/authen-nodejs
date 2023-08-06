import express from "express";
import createError from "http-errors";
import "express-async-errors";
import { config } from "dotenv";
import morgan from "morgan";
import { urlencoded, json } from "body-parser";
import cors from "cors";

// config variables environment
config();

const app = express();

//logger configuration http request
app.use(morgan("dev"));

//middleware configuration
//giai ma du lieu request
app.use(
  urlencoded({
    extended: false,
  })
);

//kieu du lieu la json
app.use(json());
app.use(cors());

import authRouter from "./src/auth/auth.routes";
import userRouter from "./src/user/user.routes";

app.get("/", (req, res) => {
  res.send("app is running");
});

app.use("/auth", authRouter);
app.use("/user", userRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res) => {
  console.log(err.stack);
  res.status(err.status || 500).send(err.message);
});

const server = app.listen(process.env.CONFIG_PORT, () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
