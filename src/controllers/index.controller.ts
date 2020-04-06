import * as express from "express";
import { Request, Response } from "express";
import IControllerBase from "interfaces/IControllerBase.interface";

class IndexController implements IControllerBase {
  public path = "/";
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get("/", this.index);
    this.router.get("/about", this.about);
    this.router.get("/contact", this.contact);
    this.router.get("/privacy-policy", this.privacy);
    this.router.get("/terms-of-service", this.terms);
    this.router.get("/ride", this.ride);
  }

  index = (req: Request, res: Response) => {
    res.render("index", { title: "Home" });
  };

  about = (req: Request, res: Response) => {
    res.render("about", { title: "About" });
  };

  contact = (req: Request, res: Response) => {
    res.render("contact", { title: "Contact" });
  };

  privacy = (req: Request, res: Response) => {
    res.render("privay-policy", { title: "Privacy Policy" });
  };

  terms = (req: Request, res: Response) => {
    res.render("terms-of-service", { title: "Terms of Service" });
  };

  ride = (req: Request, res: Response) => {
    res.render("ride", { title: "Ride" });
  };
}

export default IndexController;
