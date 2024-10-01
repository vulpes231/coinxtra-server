const User = require("../models/User");

const getUser = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "an error occured" });
  }
};
const updateUser = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "an error occured" });
  }
};

module.exports = { updateUser, getUser };
