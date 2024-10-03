//Import the libraries and Log Event function
const { format } = require("date-fns");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const LogEvents = async (message) => {
    let dateTime = format(new Date(), "yyyy-MM-dd HH:mm:ss"); 
  
    let logItem = `${dateTime} - ${uuidv4()} - ${message}\n`; 
  
    try {
      const logsDir = path.join(__dirname, "Logs");
      if (!fs.existsSync(logsDir)) {
        await fs.promises.mkdir(logsDir);
      }
  
      await fs.promises.appendFile(path.join(logsDir, "eventLogs.txt"), logItem);
      console.log("Log added:", logItem); 
    } catch (err) {
      console.error("Error writing to log file:", err);
    }
  };
  
  LogEvents("This is a test message.");
  
  module.exports = LogEvents;