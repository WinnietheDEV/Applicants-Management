const express = require("express");
const { getUsers, getUserDetail } = require("../controller/userController");
const router = express.Router();

router.route("/").get(getUsers);

router.route("/:id").get(getUserDetail);

module.exports = router;
