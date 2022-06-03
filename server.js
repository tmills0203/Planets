const fs = require("fs");
const path = require("path");
const http = require("http");
const PORT = 3000;

// SERVER
const replaceTemplate = (temp, product) => {
  //replace product name
  let output = temp.replace(/{%PLANET_NAME%}/g, product.planetName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%MOON%}/g, product.moon);
  output = output.replace(/{%PLANET_TYPE%}/g, product.planet_type);
  output = output.replace(/{%RADIUS%}/g, product.radius);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);

  // organic
  if (!product.organic)
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");

  return output;
};

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
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);

    res.end(output);

    // PRODUCT PAGE
  } else if (pathName === "/product") {
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
