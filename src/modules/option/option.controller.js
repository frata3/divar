const autoBind = require("auto-bind");
const OptionService = require("./option.service");
const { OptionMessage } = require("./option.messages");
class OptionController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = OptionService;
  }
  async create(req, res, next) {
    try {
      const { title, key, guide, enum: list, type, category, required } = req.body;
      await this.#service.create({
        title,
        key,
        guide,
        enum: list,
        type,
        category,
        required
      });
      return res.status(201).json({
        message: OptionMessage.Created,
      });
    } catch (error) {
      next(error);
    }
  }
  async update(req, res, next) {
    try {
      const { title, key, guide, enum: list, type, category, required } = req.body;
      const {id} = req.params
      await this.#service.update({
        id,
        title,
        key,
        guide,
        enum: list,
        type,
        category,
        required
      });
      return res.status(200).json({
        message: OptionMessage.Updated,
      });
    } catch (error) {
      next(error);
    }
  }
  async findById(req, res, next) {
    try {
      const { id } = req.params;
      const option = await this.#service.findById(id);
      return res.json(option);
    } catch (error) {
      next(error);
    }
  }
  async deleteById(req, res, next) {
    try {
      const { id } = req.params;
      await this.#service.removeById(id);
      return res.json({
        message: OptionMessage.Remove
      });
    } catch (error) {
      next(error);
    }
  }
  async findByCategorySlug(req, res, next) {
    try {
      const { slug } = req.params;
      const options = await this.#service.findByCategorySlug(slug);
      return res.json(options);
    } catch (error) {
      next(error);
    }
  }
  async findCategoryId(req, res, next) {
    try {
      const { id } = req.params;
      const option = this.#service.findByCategoryId(id);
      return res.json(option);
    } catch (error) {
      next(error);
    }
  }
  async find(req, res, next) {
    try {
      const options = await this.#service.find();
      return res.json(options);
    } catch (error) {
      next(error);
    }
  }
  
}
module.exports = new OptionController();
