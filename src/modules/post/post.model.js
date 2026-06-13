const { Schema, Types, model } = require("mongoose");

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: Types.ObjectId, ref: "Category", required: true },
    province: { type: String, required: false },
    city: { type: String, required: false },
    district: { type: String, required: false },
    coordinate: { type: [Number], required: false },
    images: { type: [String], required: false, default: [] },
    options: {type: Object, default: {}}
  },
  { timestamps: true } 
);

const PostModel = model("post", postSchema);
module.exports = PostModel;
