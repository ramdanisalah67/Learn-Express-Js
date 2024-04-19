const express = require("express");
const router = express.Router()
const {forgetPasswordView,sendForgetPasswordLink,getResetPasswordView,changePassword} = require("../Controllers/PasswordController");

router.route("/forgot").get(forgetPasswordView).post(sendForgetPasswordLink)
router.route("/reset-password/:id/:token").get(getResetPasswordView).post(changePassword)

module.exports = router
