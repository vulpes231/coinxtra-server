const Notification = require("../models/Notifications");
const User = require("../models/User");

const createAlert = async (req, res) => {
  try {
    const { userId } = req.params;
    const { message, subject } = req.body;
    const notificationData = { message, subject };
    const newAlert = await Notification.createNotification(
      userId,
      notificationData
    );
    res.status(201).json({ message: "Alert created." });
  } catch (error) {
    console.log(error);
    res.status(201).json({ message: "Failed to create alert. Try again" });
  }
};

const getUserAlerts = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ message: "user not found!" });

    const userAlerts = await Notification.find({ receiver: user._id });
    res.status(200).json({ userAlerts });
  } catch (error) {
    console.log(error);
    res.status(201).json({ message: "Failed to fetch alert. Try again" });
  }
};

module.exports = { createAlert, getUserAlerts };
