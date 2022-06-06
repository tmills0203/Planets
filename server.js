const fs = require("fs");
const path = require("path");
const http = require("http");
const { URL } = require("url");
const PORT = 3000;

const replaceTemplate = require("./modules/replaceTemplate");

// SERVER

const tempOverview = fs.readFileSync(
  path.join(__dirname, "template", "temp-overview.html"),
  "utf-8"
);
const tempCard = fs.readFileSync(
  path.join(__dirname, "template", "temp-card.html"),
  "utf-8"
);
const tempProduct = fs.readFileSync(
  path.join(__dirname, "template", "temp-planet_info.html"),
  "utf-8"
);

// data obj
const data = fs.readFileSync(
  path.join(__dirname, "data", "planets-data.json"),
  "utf-8"
);
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const { pathname, searchParams } = new URL(req.url, "http://localhost:3000");

  const query = Object.fromEntries(searchParams);

  //OVERVIEW PAGE
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });

    // loop thru data
    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    const output = tempOverview.replace("{%PLANET_CARDS%}", cardsHtml);

    res.end(output);

    // PRODUCT PAGE
  } else if (pathname === "/planet") {
    res.writeHead(200, { "Content-type": "text/html" });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);

    // API
  } else if (pathname === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);

    // NOT FOUND
  } else {
    res.writeHead(404, {
      "content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end("<h1>Page not found</h1>");
  }
});
server.listen(PORT, (_) => {
  console.log(`Listening on port ${PORT}`);
});
