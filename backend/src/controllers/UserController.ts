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

const updateUser = async (req: Request, res: Response) => {
  try {
    const { name, addressLine1, city, country } = req.body;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.name = name;
    user.addressLine1 = addressLine1;
    user.city = city;
    user.country = country;

    await user.save();
    res.status(200).json({
      success: true,
      user: user.toObject(),
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error updating user",
    });
  }
};

export default {
  createUser,
  updateUser,
};
