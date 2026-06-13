const { Router } = require("express");
const userController = require("./user.controller");
const Authorization = require("../../common/guard/authorization.guard");
const router = Router();
router.post("/request-otp", userController.requestOTP);
router.post("/verify-otp", userController.verifyOTP);
router.post("/set-password", userController.setPassword);
router.get("/logout", Authorization, userController.logout);
router.post("/login", userController.login);
router.get("/request-otp", (req, res) => {
  res.render("./pages/auth/request-otp.ejs", { layout: './layouts/auth/main' });
});

module.exports = {
  UserRouters: router
};
