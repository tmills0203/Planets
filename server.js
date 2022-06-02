const fs = require("fs");
const path = require("path");
const http = require("http");
const PORT = 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end("hello!");
});

server.listen(PORT, (_) => {
  console.log(`Listening on port ${PORT}`);
});
