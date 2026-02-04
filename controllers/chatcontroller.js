const services = require("../services/chatServices");

const sendMessage = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content || typeof content !== "string") {
      return res.status(400).json({ error: "Message content is required" });
    }

    const message = await services.createMessage({
      role: "user",
      content,
      userId: req.user?.id ?? null,
    });

    res.status(201).json({
  id: message.id,
  role: message.role,
  content: message.content,
  createdAt: message.createdAt
});

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const getHistory = async (req, res) => {
  try {
    const data = await services.getMessages({ userId: req.user?.id || null });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { sendMessage, getHistory };
