const express = require("express");
const router = express.Router();

const { getUserAlerts, createAlert } = require("./alertHandler");

router.route("/").get(getUserAlerts).post(createAlert);

module.exports = router;
