const Wallet = require("../models/Wallet");

const getUserWalletInfo = async (req, res) => {
  const userId = req.userId;
  try {
    const wallet = await Wallet.getUserWallet(userId);
    res.status(200).json({ wallet });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "An error occured while fetching wallet details" });
  }
};
const updateWallet = async (req, res) => {
  // const userId = req.userId;
  const { userId, address } = req.body;
  try {
    const walletData = { userId, address };
    await Wallet.editUserWallet(walletData);
    res.status(200).json({ message: "Wallet updated." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "An error occured while fetching wallet details" });
  }
};

module.exports = { getUserWalletInfo, updateWallet };
