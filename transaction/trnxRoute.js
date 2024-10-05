const express = require("express");
const { createNewTrnx } = require("./trnxHandler");

const router = express.Router();
router.route("/").post(createNewTrnx);

module.exports = router;
