import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin:
      process.env.CORS_ORIGIN || "https://chatbot-react-zd9z.onrender.com", 
    credentials: true,
  }),
);


app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import testRouter from "./routers/test.Router.js";

app.use("/api/v1/test", testRouter);

export { app };
