import * as express from "express";
import { Request, Response } from "express";
import IPost from "./blog.interface";
import IControllerBase from "interfaces/IControllerBase.interface";

import * as contentful from "contentful";

class BlogController implements IControllerBase {
  public path = "/blog";
  public router = express.Router();

  client = contentful.createClient({
    // This is the space ID. A space is like a project folder in Contentful terms
    space: "kpl03abtr9fo",
    // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
    accessToken: "AEsK2VPluQGbrRigREbeeQVE3pYuSxojxYETJeIs1Ok"
  });

  private blog: IPost[] = [];

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get(this.path + "/:id", this.getPost);
    this.router.get(this.path, this.getAllBlog);
    this.router.post(this.path, this.createPost);
  }

  getPost = async (req: Request, res: Response) => {
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
  };

  getRelatedPosts(arr, n) {
    var result = new Array(n),
      len = arr.length,
      taken = new Array(len);
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

  getAllBlog = (req: Request, res: Response) => {
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

  createPost = (req: Request, res: Response) => {
    const post: IPost = req.body;
    this.blog.push(post);
    res.send(this.blog);
  };
}

export default BlogController;
