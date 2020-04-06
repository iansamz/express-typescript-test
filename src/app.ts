import * as express from "express";
import { Application } from "express";
import * as handlebars from "express-handlebars";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import * as contentful from "contentful";

class App {
  public app: Application;
  public port: number;

  client = contentful.createClient({
    // This is the space ID. A space is like a project folder in Contentful terms
    space: "kpl03abtr9fo",
    // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
    accessToken: "AEsK2VPluQGbrRigREbeeQVE3pYuSxojxYETJeIs1Ok"
  });

  constructor(appInit: { port: number; middleWares: any; controllers: any }) {
    this.app = express();
    this.port = appInit.port;

    this.middlewares(appInit.middleWares);
    this.routes(appInit.controllers);
    this.assets();
    this.template();
  }

  private middlewares(middleWares: {
    forEach: (arg0: (middleWare: any) => void) => void;
  }) {
    middleWares.forEach(middleWare => {
      this.app.use(middleWare);
    });
  }

  private routes(controllers: {
    forEach: (arg0: (controller: any) => void) => void;
  }) {
    controllers.forEach(controller => {
      this.app.use("/", controller.router);
    });
    // this.app.get("*", (req, res) => {
    //   res.render("404");
    // });
  }

  private assets() {
    this.app.use(express.static("public"));
    this.app.use(express.static("views"));
  }

  private template() {
    let hbs = handlebars({
      layoutsDir: "views/layouts",
      partialsDir: "views/partials",
      extname: "hbs",
      helpers: {
        formatDate(date) {
          let d = new Date(date);
          return `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`;
        },
        getLink(url) {
          return `https:${url}`;
        },
        getRichText(content) {
          return documentToHtmlString(content);
        },
        ifEqual(path, title) {
          return path == title ? "active" : "";
        }
      }
    });

    this.app.engine("hbs", hbs);
    this.app.set("view engine", "hbs");
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the http://localhost:${this.port}`);
    });
  }
}

export default App;

// private async getFooterPosts() {
//   let postsHTML = "";
//   await this.client
//     .getEntries()
//     .then(posts => {
//       let footerPosts = posts.items.slice();
//       footerPosts.map(post => {
//         let fields: any = post.fields;
//         postsHTML.concat(`
//           <li class="col-12 col-lg-6 col-xl-12 px-0">
//               <div class="row my-2 my-md-3">
//                   <a class="col-5" href="${"/blog/" + post.sys.id}">
//                       <img class="rounded img-fluid hover-fade-out"
//                       src="${"http:" + fields.featureimage.fields.file.url}"
//                       alt="Caby Blog" />
//                   </a>
//                   <div class="col">
//                       <a class="h6" href="${"/blog/" + post.sys.id}">
//                       ${fields.title}</a>
//                   </div>
//               </div>
//           </li>
//         `);
//       });
//       console.log(postsHTML);
//     })
//     .catch(err => {
//       console.error(err);
//       postsHTML = "";
//     });

//   return (postsHTML = "");
// }
