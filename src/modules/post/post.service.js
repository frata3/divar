const autoBind = require("auto-bind");
const { isValidObjectId, Types } = require("mongoose");
const createHttpError = require("http-errors");
const optionModel = require("../option/option.model");
const PostModel = require("./post.model");
class PostService {
  #model;
  #optionModel;
  constructor() {
    autoBind(this);
    this.#model = PostModel;
    this.#optionModel = optionModel;
  }
  async getCategoryOptions(categoryId) {
    const options = await this.#optionModel.find({ category: categoryId });
    return options;
  }
  async create(dto) {
    return await this.#model.create(dto)
  }
  
}
module.exports = new PostService();
