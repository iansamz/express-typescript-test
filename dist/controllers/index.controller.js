"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
class IndexController {
    constructor() {
        this.path = "/";
        this.router = express.Router();
        this.index = (req, res) => {
            res.render("index", { title: "Home" });
        };
        this.about = (req, res) => {
            res.render("about", { title: "About" });
        };
        this.contact = (req, res) => {
            res.render("contact", { title: "Contact" });
        };
        this.privacy = (req, res) => {
            res.render("privay-policy", { title: "Privacy Policy" });
        };
        this.terms = (req, res) => {
            res.render("terms-of-service", { title: "Terms of Service" });
        };
        this.initRoutes();
    }
    initRoutes() {
        this.router.get("/", this.index);
        this.router.get("/about", this.about);
        this.router.get("/contact", this.contact);
        this.router.get("/privacy-policy", this.privacy);
        this.router.get("/terms-of-service", this.terms);
    }
}
exports.default = IndexController;
//# sourceMappingURL=index.controller.js.map