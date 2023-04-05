const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const PORT = process.env.PORT || 3000;

// Custom Middleware Logger
app.use(logger);

// Cross-Origin Resource Sharing
const whiteList = [
  "https://www.google.com",
  "http://127.0.0.1:5500",
  "http://localhost:3000",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(express.static(path.join(__dirname, "/public")));

app.get("^/$|/index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/new-page.html", (req, res) => {
  //   res.sendFile("./views/new-page.html", { root: __dirname });
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

app.get("/old-page.html", (req, res) => {
  res.redirect(301, "/new-page.html");
});

// Route Handlers
app.get(
  "/hello(.html)?",
  (req, res, next) => {
    console.log("Attempted to serve hello.html");
    next();
  },
  (req, res) => {
    res.send("Hello World!");
  }
);

// Array of callback functions
const one = function (req, res, next) {
  console.log("One");
  next();
};
const two = function (req, res, next) {
  console.log("two");
  next();
};
const three = function (req, res, next) {
  console.log("three");
  res.send("Hello from three");
};

app.get("/chain.html", [one, two, three]);

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is listing on port ${PORT}`);
});
