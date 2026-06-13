const { Router } = require("express");
const { allRouters } = require("./modules/auth/auth.routes");
const { UserRouters } = require("./modules/user/user.routes");
const { CategoryRouters } = require("./modules/category/category.routes");
const { OptionRouters } = require("./modules/option/option.routes");
const { PostRouter } = require("./modules/post/post.routes");
const Authorization = require("./common/guard/authorization.guard");

const mainRouter = Router();
// mainRouter.use("/user", allRouters);
mainRouter.use("/auth", UserRouters);
mainRouter.use("/category",CategoryRouters);
mainRouter.use("/option",OptionRouters);
mainRouter.use("/post",PostRouter);
mainRouter.get("/panel", Authorization, (req, res) => {
    res.render("./pages/index.ejs");
  });
// mainRouter.get("/login", (req, res) => {
//     res.render("./pages/auth/login.ejs", { layout: './layouts/auth/main' });
// });
// mainRouter.get("/signup", (req, res) => {
//     res.render("./pages/auth/signup.ejs", { layout: './layouts/auth/main' }); 
// });
// mainRouter.get("/panel/products", (req, res) => {
//     res.render("./pages/panel/products.ejs", { layout: './layouts/panel/main' }); 
// });
module.exports = mainRouter;
