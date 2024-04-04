const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const { logger } = require("./middleware/logEvents");
const errorLog = require("./middleware/errorLog");
const PORT = process.env.PORT || 3000;

// Custom Middleware
app.use(logger);

const whiteList = [
  "http://127.0.0.1:550",
  "http://localhost:3000",
  "https://www.google.com",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

// Express Middleware functions
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.get("^/$|/index.html", (req, res) => {
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

app.use(errorLog);

app.listen(PORT, () => {
  console.log(`Server is listing on Port ${PORT}`);
});
