const autoBind = require("auto-bind");
const postService = require("./post.service");
const { PostMessage } = require("./post.messages");
const CategoryModel = require("../category/category.model");
const createHttpError = require("http-errors");
const utf8 = require("utf8");
const { removePropertyInObject } = require("../../common/utils/funtions");
const { Types } = require("mongoose");
class PostController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = postService;
  }
  async createPostPage (req, res, next) {
    try {
        let {slug} = req.query;
        let showBack = false;
        let match = {parent: null};
        let options, category;
        if (slug) {
            slug = slug.trim();
            category = await CategoryModel.findOne({slug});
            if (!category) throw new createHttpError.NotFound(PostMessage.NotFound);
            options = await this.#service.getCategoryOptions(category._id);
            if (options.length === 0) options = null;
            showBack = true;
            match = {
                parent: category._id
            };
        }
        const categories = await CategoryModel.aggregate([
            {
                $match: match
            }
        ]);
        res.render("./pages/panel/create-post.ejs", {
            categories,
            showBack,
            category: category?._id.toString(),
            options,

        });
    } catch (error) {
        next(error);
    }
}
async create (req, res, next) {
  try {
    // const userId = req.user._id;
      const images = req?.files?.map(image => image?.path?.slice(7));
      const {title_post: title, description: content,  category, amount} = req.body;
      const options = removePropertyInObject(req.body, ["amount", 'title_post', "description", "lat", "lng", "category", "images"]);
      for (let key in options) {
          let value = options[key];
          delete options[key];
          key = utf8.decode(key);
          options[key] = value;
      }
      // const {address, province, city, district} = await getAddressDetail(lat, lng);
      await this.#service.create({
          // userId,
          title,
          amount,
          content,
          // coordinate: [lat, lng],
          category: new Types.ObjectId(category),
          images,
          options,
          // address,
          // province,
          // city,
          // district
      });
      this.success_message = PostMessage.Created;
      return res.redirect('/post/my');
  } catch (error) {
      console.log(error);
      next(error);
  }
}
  async find(req, res, next) {
    try {
      const categories = await this.#service.find();
      return res.json(categories);
    } catch (error) {
      next(error);
    }
  }
  async deleteById(req, res, next) {
    try {
      const { id } = req.params;
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new PostController();
