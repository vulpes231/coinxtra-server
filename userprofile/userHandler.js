const User = require("../models/User");

const getUser = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await User.getUserInfo(userId);
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "An error occured while fethcing user details" });
  }
};

const updateUser = async (req, res) => {
  const userId = req.userId;
  const { username, email, phone, address } = req.body;
  try {
    const userData = { username, email, phone, address };
    await User.editUserInfo(userId, userData);
    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "An error occured while updating profile. Try again" });
  }
};

const updatePassword = async (req, res) => {
  const userId = req.userId;
  const { password, newPassword } = req.body;
  try {
    const passData = { password, newPassword };
    await User.changePassword(userId, passData);
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "An error occured while updating password. Try again" });
  }
};

module.exports = { updateUser, getUser, updatePassword };
