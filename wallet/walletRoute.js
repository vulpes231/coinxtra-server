const express = require("express");
const { getUserWalletInfo, updateWallet } = require("./walletHandler");

const router = express.Router();
router.route("/").get(getUserWalletInfo).put(updateWallet);

module.exports = router;
