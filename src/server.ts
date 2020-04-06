import App from "./app";

import * as bodyParser from "body-parser";
import loggerMiddleware from "./middleware/logger";

import BlogController from "./controllers/blog/blog.controller";
import IndexController from "./controllers/index.controller";

const app = new App({
  port: 5000,
  controllers: [new IndexController(), new BlogController()],
  middleWares: [
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    loggerMiddleware
  ]
});

app.listen();
