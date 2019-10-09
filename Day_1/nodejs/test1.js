var http = require("http");
var url = require("url");
var fs = require("fs");

http
  .createServer(function(req, res) {
    var q = url.parse(req.url, true);
    var filename = "." + q.pathname;
    fs.readFile(filename, function(err, data) {
      if (filename == "./") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write("<h1>Welcome to my training site</h1>");
        return res.end();
      }
      if (filename == "./help") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write("<h1>You are at the help page</h1>");
        return res.end();
      }
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html" });
        return res.end("404 Not Found");
      }
    });
  })
  .listen(8084);

console.log("Hello");
