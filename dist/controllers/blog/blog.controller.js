"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const contentful = require("contentful");
class BlogController {
    constructor() {
        this.path = "/blog";
        this.router = express.Router();
        this.client = contentful.createClient({
            // This is the space ID. A space is like a project folder in Contentful terms
            space: "kpl03abtr9fo",
            // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
            accessToken: "AEsK2VPluQGbrRigREbeeQVE3pYuSxojxYETJeIs1Ok"
        });
        this.blog = [];
        this.getPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            this.client
                .getEntries()
                .then(posts => {
                let post = posts.items.find(p => p.sys.id == id);
                let relatedPosts = this.getRelatedPosts(posts.items, 3);
                res.render("blog/id", { title: "Blog", post, relatedPosts });
            })
                .catch(err => {
                console.error(err);
                res.render("404");
            });
        });
        this.getAllBlog = (req, res) => {
            // This API call will request an entry with the specified ID from the space defined at the top, using a space-specific access token.
            this.client
                .getEntries()
                .then(entries => {
                // console.log(entries.items[0].fields);
                res.render("blog/index", { title: "Blog", posts: entries.items });
            })
                .catch(err => {
                console.log(err);
            });
        };
        this.createPost = (req, res) => {
            const post = req.body;
            this.blog.push(post);
            res.send(this.blog);
        };
        this.initRoutes();
    }
    initRoutes() {
        this.router.get(this.path + "/:id", this.getPost);
        this.router.get(this.path, this.getAllBlog);
        this.router.post(this.path, this.createPost);
    }
    getRelatedPosts(arr, n) {
        var result = new Array(n), len = arr.length, taken = new Array(len);
        if (n > len) {
            result = arr;
            return result;
        }
        while (n--) {
            var x = Math.floor(Math.random() * len);
            result[n] = arr[x in taken ? taken[x] : x];
            taken[x] = --len in taken ? taken[len] : len;
        }
        return result;
    }
}
exports.default = BlogController;
//# sourceMappingURL=blog.controller.js.map