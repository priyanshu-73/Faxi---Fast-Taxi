import { validationResult } from "express-validator";
import userModel, { hashPassword } from "../models/user.model.js";
import { createUser } from "../services/user.services.js";

export const registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password } = req.body;

  const hashedPassword = await hashPassword(password);

  const user = await createUser({firstname: fullname.firstname, lastname: fullname.lastname, email, password: hashedPassword});

  const token = user.generateAuthToken(user);
  res.status(201).json({token, user});
};
