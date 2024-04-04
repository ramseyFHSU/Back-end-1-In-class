// NPM modules
const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

// Code Modules
const fs = require("fs");
const path = require("path");
const fsPromises = require("fs").promises;

const logEvents = async (message) => {
  const dateTime = `${format(new Date(), "MM-dd-yyyy\thh:mm:ss")}`;
  const logItem = `${dateTime} \t ${uuid()} \t ${message} \n`;
  console.log(logItem);

  // Use try block to Check if a folder named "logs" exists Or else create one
  // Create a file named "eventLogs.txt" inside the folder and use append to register the logItem in the eventLogs file
  // Use error block to catch the errors

  try {
    if (!fs.existsSync(path.join(__dirname, "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "logs"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "logs", "eventLogs.txt"),
      logItem
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = logEvents;

// logEvents("This is Test");
