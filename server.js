const fs = require("fs");
const path = require("path");
const http = require("http");
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
  const pathName = req.url;

  //OVERVIEW PAGE
  if (pathName === "/" || pathName === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });

    // loop thru data
    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    const output = tempOverview.replace("{%PLANET_CARDS%}", cardsHtml);

    res.end(output);

    // PRODUCT PAGE
  } else if (pathName === "/planet") {
    res.end("this is the product");

    // API
  } else if (pathName === "/api") {
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
