import { genToken } from "../../utils/genToken.js";
import { Auth } from "../modal/auth.schema.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) {
      return res.status(400).json("All fields are required");
    }
    const isUserExist = await Auth.findOne({ email });
    if (isUserExist) {
      return res.status(400).json({
        message: "Email is already exist",
      });
    }

    const user = await Auth.create({
      userName,
      email,
      password,
    });
    return res.status(201).json({
      message: "User register successfully",
      data: {
        _id: user._id,
        email: user.email,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const user = await Auth.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User Not Found",
      });
    }

    const isPassword = await user.comparePassword(password);
    if (!isPassword) {
      return res.status(400).json({
        message: "password is incorrect",
      });
    }

    const token = await genToken(user._id, user.userName, user.email);

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
        message: "User Signin Successfully",
        data: {
          _id: user._id,
          userName: user.userName,
          email: user.email,
        },
      });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
