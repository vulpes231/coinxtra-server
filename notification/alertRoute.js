const express = require("express");
const router = express.Router();

const { getUserAlerts, createAlert } = require("./alertHandler");

router.route("/:userId").get(getUserAlerts).post(createAlert);

module.exports = router;
