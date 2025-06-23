const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const walletSchema = new Schema({
  address: {
    type: String,
  },
  coinType: {
    type: String,
    default: "bitcoin",
  },
  balance: {
    type: Number,
    default: 0,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

walletSchema.statics.getUserWallet = async function (userId) {
  try {
    const userWallet = await this.findOne({ owner: userId });
    if (!userWallet) {
      throw new Error("User wallet not found!");
    }
    return userWallet;
  } catch (error) {
    throw new Error("Error fetching user wallet info");
  }
};

walletSchema.statics.editUserWallet = async function (walletData) {
  try {
    const userWallet = await Wallet.findOne({ owner: walletData.userId });
    if (!userWallet) {
      throw new Error("User wallet not found!");
    }
    userWallet.address = walletData.address;
    await userWallet.save();
    return userWallet;
  } catch (error) {
    throw new Error("Error updating wallet address");
  }
};

const Wallet = mongoose.model("Wallet", walletSchema);
module.exports = Wallet;
