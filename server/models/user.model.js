import mongoose from "mongoose";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema(
  {
    fullname: {
      firstname: {
        type: String,
        required: true,
        minlength: [3, "First name must be at least 3 characters long"],
      },
      lastname: {
        type: String,
        required: true,
        minlength: [3, "First name must be at least 3 characters long"],
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: [5, "E-mail must be at least 5 characters long"],
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    soketId: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.methods.generateAuthToken = (user) => {
  const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
  return token;
}

userSchema.methods.comparePassword = async (user, password) => {
  return bcryptjs.compareSync(password, user.password)
}

export const hashPassword = async (password) => {
  return bcryptjs.hashSync(password, 10);
}

const userModel = mongoose.model("user", userSchema);

export default userModel

