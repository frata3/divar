const jwt = require("jsonwebtoken");
const userModel = require("../../modules/user/user.model");
require("dotenv").config();

const Authorization = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return res.redirect("/auth/request-otp");
    }
    const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (typeof data === "object" && "id" in data) {
      const user = await userModel
        .findById(data.id, { accessToken: 0, otp: 0, __v: 0, updatedAt: 0 })
        .lean();
      const user2 = await userModel.findById(data.id);

      if (!user) {
        return res.redirect("/auth/request-otp");
      }
      req.user = user;
      return next();
    } else {
      return res.redirect("/auth/request-otp");
    }
  } catch (error) {
    return res.redirect("/auth/request-otp");
  }
};

module.exports = Authorization;
