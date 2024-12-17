import { validationResult } from "express-validator";
import userModel, { hashPassword } from "../models/user.model.js";
import blacklistTokenModel from "../models/blacklistToken.model.js";
import { createUser } from "../services/user.services.js";

export const registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password } = req.body;

  const hashedPassword = await hashPassword(password);

  const user = await createUser({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
  });

  const token = user.generateAuthToken(user);
  res.status(201).json({ token, user });
};

export const loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({ message: "Invalid Credentials" });
  }

  const isMatch = await user.comparePassword(user, password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid Credentials" });
  }

  const token = await user.generateAuthToken(user);
  res.cookie("token", token).status(200).json({ token, user });
};

export const getProfile = async (req, res, next) => {
  res.status(200).json(req.user);
};

export const logout = async (req, res, next) => {
  res.clearCookie("token");

  const token = req.cookies.token || req.authorization.split(" ")[1];

  await blacklistTokenModel.create({ token });

  res.status(200).json({ message: "Logged out Successfully" });
};
