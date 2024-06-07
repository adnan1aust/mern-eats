import express, { Request, Response } from "express";
import cors from "cors";
import colors from "colors";
import mongoose from "mongoose";
import userRoute from "./routes/userRoutes";
import restaurantRoute from "./routes/restaurantRoutes";
import { v2 as cloudinary } from "cloudinary";

import "dotenv/config";

colors.enable();
mongoose.connect(process.env.MONGODB_CON_STRING!).then(() => {
  console.log("CONNECTED TO MONGODB".green);
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
app.use(express.json());
app.use(cors());

app.get("/health", (req: Request, res: Response) => {
  res.send({
    message: "health ok!",
  });
});

app.use("/api/v1/users", userRoute);
app.use("/api/v1/restaurant", restaurantRoute);

app.listen(7000, () => {
  console.log("SERVER IS RUNNING ON PORT 7000".green);
});
