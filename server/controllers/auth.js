import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import users from "../models/auth.js";

const formatUserPayload = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  about: user.about,
  tags: user.tags,
  joinedOn: user.joinedOn,
});

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  const normalizedName = String(name || "").trim();
  const normalizedEmail = String(email || "").trim().toLowerCase();

  if (!normalizedName || !normalizedEmail || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (!/^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(String(password))) {
    return res.status(400).json({
      message: "Password should be at least 8 characters with at least 1 letter and 1 number",
    });
  }

  try {
    const existinguser = await users.findOne({ email: normalizedEmail });
    if (existinguser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await users.create({
      name: normalizedName,
      email: normalizedEmail,
      password: hashedPassword,
    });
    const token = jwt.sign({ email: newUser.email, id: newUser._id }, process.env.JWT_SECRET, {  expiresIn:'1h' });
    res.status(201).json({ result: formatUserPayload(newUser), token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong..." });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const normalizedEmail = String(email || "").trim().toLowerCase();

  if (!normalizedEmail || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const existinguser = await users.findOne({ email: normalizedEmail });
    if (!existinguser) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const isPasswordcrt = await bcrypt.compare(password, existinguser.password)
    if(!isPasswordcrt){
        return res.status(401).json({message:"Invalid credentials"})
    }

    const token = jwt.sign({ email: existinguser.email, id: existinguser._id }, process.env.JWT_SECRET, {  expiresIn: "1h", });
    res.status(200).json({ result: formatUserPayload(existinguser), token }); 

  } catch (error) {
    res.status(500).json({ message: "Something went wrong..." });
  }
};
