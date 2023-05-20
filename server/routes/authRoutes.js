const express = require("express");
const { login, register, logout } = require("../controller/authenController");
const router = express.Router();

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/logout").get(logout);

module.exports = router;
