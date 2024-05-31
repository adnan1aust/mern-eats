import { Request, Response } from "express";
import User from "../models/user";

const createUser = async (req: Request, res: Response) => {
  try {
    const { auth0Id, email, name, addressLine1, city, country } = req.body;
    const existingUser = await User.findOne({ auth0Id });
    if (existingUser) {
      return res.status(200).json({
        success: true,
        message: "User already exists",
      });
    }
    const newUser = new User({
      auth0Id,
      email,
      name,
      addressLine1,
      city,
      country,
    });
    await newUser.save();
    res.status(201).json({
      success: true,
      user: newUser.toObject(),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error creating user",
    });
  }
};

export default {
  createUser,
};
