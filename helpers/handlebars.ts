import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
export class HandlebarsHelpers {
  formatDate(date) {
    let d = new Date(date);
    return `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`;
  }

  getLink(url) {
    return `https://${url}`;
  }

  getRichText(content) {
    return documentToHtmlString(content);
  }
}
