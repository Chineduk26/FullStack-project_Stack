
// services/logService.js
const Log = require("../models/Log");
const User = require("../models/User");

exports.addLog = async (userId, action) => {
  try {
    await Log.create({ userId, action });
  } catch (err) {
    console.error("Error writing log:", err.message);
  }
};

exports.getLogs = async () => {
  return await Log.findAll({
    include: [{ model: User, attributes: ["username"] }],
    order: [["timestamp", "DESC"]]
  });
};
