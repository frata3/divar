const autoBind = require("auto-bind");
const categoryService = require("./category.service");
const { CategoryMessage } = require("./category.messages");
class CategoryController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = categoryService;
  }
  async create(req, res, next) {
    try {
      const { name, slug, icon, parent } = req.body;
      await this.#service.create({ name, slug, icon, parent })
      return res.status(201).json({
        message: CategoryMessage.Created
      })
    } catch (error) {
      next(error);
    }
  }
  async find(req, res, next) {
    try {
      const categories = await this.#service.find()
      return res.json(categories)
    } catch (error) {
      next(error);
    }
  }
  async deleteById(req, res, next) {
    try {
      const { id } = req.params;
      await this.#service.removeById(id);
      return res.json({
        message: CategoryMessage.Remove
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new CategoryController();
