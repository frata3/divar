const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const OTPSchema = new Schema({
  code: { type: String, required: false, default: undefined },
  expiresIn: { type: Number, required: false, default: 0 },
});

const userSchema = new Schema(
  {
    fullName: { type: String, required: false },
    email: { type: String, unique: true, required: false }, 
    otp: { type: OTPSchema },
    verifiedEmail: { type: Boolean, required: true, default: false },
    accessToken: { type: String },
    password: { type: String, required: false },
  },
  { timestamps: true }
);

userSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const userModel = model("user", userSchema);
module.exports = userModel;
