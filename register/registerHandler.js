const User = require("../models/User");

const signupUser = async (req, res) => {
  const { username, password, firstname, lastname, email, phone, address } =
    req.body;
  if (!username || !password || !email || !firstname || !lastname)
    return res.status(400).json({ message: "incomplete user data!" });
  try {
    const userData = {
      username,
      password,
      firstname,
      lastname,
      email,
      phone: phone || "",
      address: address || "",
    };

    await User.registerUser(userData);

    res
      .status(201)
      .json({ message: `account created for ${username} successfully.` });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "an error occured during login. try again" });
  }
};

module.exports = { signupUser };
