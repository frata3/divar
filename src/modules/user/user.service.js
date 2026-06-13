const autoBind = require("auto-bind");
const userModel = require("../user/user.model");
const createHttpError = require("http-errors");
const AuthMessage = require("./user.messages");
const { randomInt } = require("crypto");
const jwt = require("jsonwebtoken");
const sendEmail = require("./user.email");

class AuthService {
  #model;
  constructor() {
    autoBind(this);
    this.#model = userModel;
  }

  async sendOTP(email) {
    const user = await this.#model.findOne({ email });
    const now = new Date().getTime();
    const otpSetting = {
      code: randomInt(10000, 99999),
      expiresIn: now + 1000 * 60 * 2, // (milliseconds * second * minute)
    };
  
    if (!user) {
      const newUser = await this.#model.create({
        email,
        otp: otpSetting,
        __v: 0,
      });
      // await sendEmail(
      //   email,
      //   "کد تایید شما",
      //   `کد تایید شما: ${otpSetting.code}`
      // );
      return newUser;
    }
  
    if (user.verifiedEmail && !user.password) {
      return {
        UserEmail: user.email,
        verifiedEmail: true,
        password: false,
      };
    }
  
    if (user.otp && user.otp.expiresIn > now) {
      return { notExpired: true };
    }
  
    user.otp = otpSetting;
    await user.save();
    // await sendEmail(user.email, 'کد تایید شما', `کد تایید شما: ${otpSetting.code}`);

    return {
      UserEmail: user.email,
      password: user.password,
      verifiedEmail: user.verifiedEmail,
      expiresIn: user.otp.expiresIn,
    };
  }
  
  

  async verifyOTP(email, code) {
    const user = await this.checkExistByEmail(email);
    const now = new Date().getTime();
    if (user?.otp?.expiresIn < now)
      throw new createHttpError.BadRequest(AuthMessage.OtpCodeExpired);
    if (user?.otp?.code !== code)
      throw new createHttpError.BadRequest(AuthMessage.OtpCodeIsIncorrect);
    if (!user.verifiedEmail) {
      user.verifiedEmail = true;
    }
    const accessToken = this.signToken({ email, id: user._id });
    user.accessToken = accessToken;
    await user.save();
    return accessToken;
  }
  async checkExistByEmail(email) {
    const user = await this.#model.findOne({ email });
    if (!user) throw new createHttpError.NotFound(AuthMessage.NotFound);
    return user;
  }
  async setPassword(email, password) {
    const user = await this.#model.findOne({ email });
    if (!user) throw new createHttpError.NotFound(AuthMessage.NotFound);
  
    user.password = password;
    const accessToken = this.signToken({ email, id: user._id });
    user.accessToken = accessToken;
  
    await user.save();
    return { user, accessToken };
  }
  

  async authenticate(email, password) {
    const user = await this.#model.findOne({ email });
    if (!user) {
      return { userNotFound: true };
    }
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return { passwordNotMatch: true };
    }

    const accessToken = this.signToken({ email, id: user._id });
    user.accessToken = accessToken;
    await user.save();
    return { user, accessToken };
  }

  signToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "1y" });
  }
}

module.exports = new AuthService();
