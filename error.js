import connectDB, { User } from "./models/db.js";

export const checkDuplicate = async (req, res, next) => {
  const { username, email } = req.body;
  connectDB();
  const emailExists = await User.findOne({ email: email });
  if (emailExists)
    return res.status(409).json({
      error: "email",
    });

  const usernameExists = await User.findOne({ username: username });
  if (usernameExists)
    return res.status(409).json({
      error: "username",
    });

  next();
};
