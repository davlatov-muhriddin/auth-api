import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import registerRoute from "./routes/register.js";

const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://auth-react-zeta.vercel.app/", // Frontendning URL manzili
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));

dotenv.config();

// routes
app.use("/api/register", registerRoute);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  })
  .then(() => console.log("mongodb ga muvofaqiyatli ulanildi"))
  .catch((err) => console.log(`mongodb ga ulanishda xatolik yuz berdi ${err}`));

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
