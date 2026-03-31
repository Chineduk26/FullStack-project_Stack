const services = require("../services/chatServices");

// Handle sending a new message
exports.sendMessage = async (req, res, next) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "You must be logged in to chat" });
    }

    const result = await services.processMessage({
      content: req.body.content,
      userId: req.user.id,
      source: "web",
    });

    res.json(result);
  } catch (err) {
    console.error("Error in sendMessage:", err.message);
    next(err);
  }
};


// Handle fetching chat history
exports.getHistory = async (req, res) => {
  try {
    const userId = req.user?.id || "test-user";
    const data = await services.getMessages(userId);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error in getHistory:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};