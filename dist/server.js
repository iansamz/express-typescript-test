"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const bodyParser = require("body-parser");
const logger_1 = require("./middleware/logger");
const blog_controller_1 = require("./controllers/blog/blog.controller");
const index_controller_1 = require("./controllers/index.controller");
const app = new app_1.default({
    port: 5000,
    controllers: [new index_controller_1.default(), new blog_controller_1.default()],
    middleWares: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        logger_1.default
    ]
});
app.listen();
//# sourceMappingURL=server.js.map