const Transaction = require("../models/Transaction");

const createNewTrnx = async (req, res) => {
  const userId = req.userId;
  const { coinType, createdAt, amount, transactionType, status } = req.body;
  try {
    const trnxData = { coinType, createdAt, amount, transactionType, status };
    const trnx = await Transaction.createTransaction(userId, trnxData);
    res.status(201).json({ message: "transaction created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createNewTrnx };
