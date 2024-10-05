const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const trnxSchema = new Schema({
  transactionType: {
    type: [String],
    enum: ["deposit", "withdrawal", "transfer", "upgrade"],
  },
  amount: {
    type: Number,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  coinType: {
    type: String,
  },
  createdAt: {
    type: String,
  },
  status: {
    type: [String],
    enum: ["completed", "pending", "failed"],
  },
});

trnxSchema.statics.createTransaction = async function (userId, trnxData) {
  const User = require("./User");
  const Wallet = require("./Wallet");
  const { coinType, createdAt, amount, transactionType, status } = trnxData;

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const user = await User.findById(userId).session(session);
    if (!user) {
      await session.abortTransaction();
      await session.endSession();
      throw new Error("User not found!");
    }

    const userWallet = await Wallet.findOne({ owner: user._id }).session(
      session
    );
    if (!userWallet) {
      await session.abortTransaction();
      await session.endSession();
      throw new Error("User wallet not found!");
    }
    const parsedAmount = parseFloat(amount);
    userWallet.balance += parsedAmount;

    await userWallet.save({ session });

    const newTransaction = new this({
      coinType,
      createdAt,
      amount,
      transactionType,
      createdBy: user._id,
      status,
    });

    await newTransaction.save({ session });
    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
};

trnxSchema.statics.deposit = async function (userId, trnxData) {
  const User = require("./User");
  const Wallet = require("./Wallet");
  const { coinType, createdAt, amount, transactionType } = trnxData;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const user = await User.findById(userId).session(session);
    if (!user) {
      await session.abortTransaction();
      await session.endSession();
      throw new Error("User not found!");
    }
  } catch (error) {
    throw error;
  } finally {
    await session.endSession();
  }
};

trnxSchema.statics.withdraw = async function (userId, trnxData) {
  const { coinType, createdAt, amount, transactionType } = trnxData;
  const session = await mongoose.startSession();
  try {
  } catch (error) {
    throw error;
  }
};

const Transaction = mongoose.model("Transaction", trnxSchema);
module.exports = Transaction;
