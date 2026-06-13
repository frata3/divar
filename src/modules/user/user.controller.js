const autoBind = require("auto-bind");
const UserService = require("./user.service");
const createHttpError = require("http-errors");
const CookieNames = require("../../common/constant/cookie.enum");
const nodeEnv = require("../../common/constant/env.enum");
const { AuthMessage } = require("../auth/auth.messages");

class AuthController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = UserService;
  }
  async setPassword(req, res, next) {
    try {
      const { email, password } = req.body;
      const { user, accessToken } = await UserService.setPassword(
        email,
        password
      );

      return res
        .cookie(CookieNames.AccessToken, accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === nodeEnv.Production,
        })
        .redirect("/panel");
    } catch (error) {
      next(error);
    }
  }

  async requestOTP(req, res, next) {
    try {
      const { email } = req.body;
      const { UserEmail, password, verifiedEmail, notExpired, expiresIn } =
        await UserService.sendOTP(email);

      if (verifiedEmail && password) {

        return res.render("./pages/auth/login.ejs", {
          layout: "./layouts/auth/main",
          email: UserEmail,
        });
      }

      if (verifiedEmail && !password) {

        return res.render("./pages/auth/addPassword.ejs", {
          layout: "./layouts/auth/main",
          email: UserEmail,
        });
      }

      if (verifiedEmail === false) {
        return res.render("./pages/auth/verify-otp.ejs", {
          layout: "./layouts/auth/main",
          email: UserEmail,
          expiresIn,
        });
      }

      if (notExpired) {

        return res.render("./pages/auth/verify-otp.ejs", {
          layout: "./layouts/auth/main",
          email: UserEmail,
          expiresIn,
        });
      }

      return res.render("./pages/auth/verify-otp.ejs", {
        layout: "./layouts/auth/main",
        email: UserEmail,
        expiresIn,
      });
    } catch (error) {
      next(error);
    }
  }

  async verifyOTP(req, res, next) {
    try {
      const { email, code } = req.body;
      const token = await this.#service.verifyOTP(email, code);
      return res
        .cookie(CookieNames.AccessToken, token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === nodeEnv.Production,
        })
        .redirect("/panel");
    } catch (error) {
      if (error.status === 400 || error.status === 404) {
        const user = await this.#service.checkExistByEmail(req.body.email);
        return res.render("./pages/auth/verify-otp.ejs", {
          layout: "./layouts/auth/main",
          email: req.body.email,
          expiresIn: user.otp.expiresIn,
          errorMessage: error.message,
        });
      }
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      return res.clearCookie(CookieNames.AccessToken).redirect("/panel");
    } catch (error) {
      next(error);
    }
  }
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await UserService.authenticate(email, password);
      if (result.passwordNotMatch) {
        return res.render("./pages/auth/login.ejs", {
          layout: "./layouts/auth/main",
          passwordNotMatch: true,
        });
      }
      if (result.userNotFound) res.redirect("/panel");
      res.cookie("access_token", result.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
      return res.redirect("/panel");
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
