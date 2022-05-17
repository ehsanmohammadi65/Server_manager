const express = require("express");
const app = express();
const os = require("os");

// Add headers before the routes are defined
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
  // Pass to next layer of middleware
  next();
});
app.use("/info", (req, res) => {
  let cpu = os.cpus();
  let Memory = os.freemem();
  let UpTimeOs = os.uptime();
  let OsPlatform = os.platform();
  let OsType = os.type();
  let OsVersion = os.version();
  let OsHostname = os.hostname();
  res.json({
    OsPlatform,
    OsType,
    OsVersion,
    OsHostname,
    Memory: Memory,
    UpTimeOs,
    cpu: cpu,
  });
});
app.listen(100);
