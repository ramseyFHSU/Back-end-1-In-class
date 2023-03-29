const http = require("http");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const serveFile = async (filePath, contentType, response) => {
  try {
    const rawData = await fsPromises.readFile(filePath, "utf8");
    const data =
      contentType === "application/json" ? JSON.parse(rawData) : rawData;

    response.writeHead(200, { "Content-Type": contentType });
    // response.end(data);
    response.end(
      contentType === "application/json" ? JSON.stringify(data) : data
    );
  } catch (err) {
    console.log(err);
    response.statusCode = 500;
    response.end();
  }
};

const server = http.createServer((req, res) => {
  console.log(req.url, req.url);

  //   //   let filePath;

  //   if (req.url === "/" || req.url === "index.html");
  //   res.statusCode = 200;
  //   res.setHeader("Content-Type", "text/html");
  //   filePath = path.join(__dirname, "views", "index.html");
  //   fs.readFile(filePath, "utf8", (err, data) => {
  //     res.end(data);
  //   });

  //   // Second Method
  //   switch (req.url) {
  //     case "/":
  //       res.statusCode = 200;
  //       res.setHeader("Content-Type", "text/html");
  //       filePath = path.join(__dirname, "views", "index.html");
  //       fs.readFile(filePath, "utf8", (err, data) => {
  //         res.end(data);
  //       });
  //       break;
  //   }

  //   Third Method
  let contentType;
  const extension = path.extname(req.url);
  switch (extension) {
    case ".css":
      contentType = "text/css";
      break;
    case ".js":
      contentType = "text/javascript";
      break;
    case ".txt":
      contentType = "text/plain";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".img":
      contentType = "image/jpeg";
      break;
    case ".png":
      contentType = "image/png";
      break;
    default:
      contentType = "text/html";
  }
  //Setting up a file path
  let filePath =
    contentType === "text/html" && req.url === "/"
      ? path.join(__dirname, "views", "index.html")
      : contentType === "text/html" && req.url.slice(-1) === "/"
      ? path.join(__dirname, "views", "index.html")
      : contentType === "text/html"
      ? path.join(__dirname, "views", req.url)
      : path.join(__dirname, req.url);

  //Makes .html extensions not required in the browser
  if (!extension && req.url.slice(-1) !== "/") filePath += ".html";
  const fileExists = fs.existsSync(filePath);

  if (fileExists) {
    serveFile(filePath, contentType, res);
  } else {
    // 404
    console.log(path.parse(filePath));
    switch (path.parse(filePath).base) {
      case "old-page.html":
        res.writeHead(301, { Location: "/new-page.html" });
        res.end();
        break;
      case "www-page.html":
        res.writeHead(301, { Location: "/" });
        res.end();
        break;
      default:
        serveFile(path.join(__dirname, "views", "404.html"), "text/html", res);
    }
  }
});

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});
