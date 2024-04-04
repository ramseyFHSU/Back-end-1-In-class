const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3000;

app.get("^/$|/index.html", (req, res) => {
  //   res.sendFile("./views/index.html", { root: __dirname });
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/new-page.html", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

app.get("/old-page.html", (req, res) => {
  res.redirect(301, "/new-page.html");
});

app.get(
  "/hello.html",
  (req, res, next) => {
    console.log("Attempted to access hello.html");
    next();
  },
  (req, res) => {
    res.send("Hello World!");
  }
);

const one = function (req, res, next) {
  console.log("this is from One");
  next();
};

const two = function (req, res, next) {
  console.log("this is from Two");
  next();
};

const three = function (req, res, next) {
  console.log("this is from Three");
  res.send("Hello From Three");
};

app.get("/chain(.html)?", [one, two, three]);

app.listen(PORT, () => {
  console.log(`Server is listing on Port ${PORT}`);
});
