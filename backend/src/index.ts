import express, { Request, Response } from "express";
import cors from "cors";
import colors from "colors";
import mongoose from "mongoose";

import "dotenv/config";

colors.enable();
mongoose.connect(process.env.MONGODB_CON_STRING!).then(() => {
  console.log("CONNECTED TO MONGODB".green);
});

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", async (req: Request, res: Response) => {
  res.json({
    message: "Hello",
  });
});

app.listen(7000, () => {
  console.log("SERVER IS RUNNING ON PORT 7000".green);
});
