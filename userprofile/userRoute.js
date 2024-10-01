const express = require("express");
const { updateUser, getUser, updatePassword } = require("./userHandler");

const router = express.Router();
router.route("/").get(getUser).post(updatePassword).put(updateUser);

module.exports = router;
