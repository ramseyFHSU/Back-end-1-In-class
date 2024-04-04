const http = require("http");
const events = require("events");
const logEvents = require("./logEvents");

const myEmitter = new events.EventEmitter();

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
});

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});

// myEmitter.on("log", (msg) => {
//   logEvents(msg);
// });
// myEmitter.emit("log", "Log event emitted");
