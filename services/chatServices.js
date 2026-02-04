const Message = require("../models/chat");

exports.createMessage = async ({ role, content, userId }) => {
  const message = await Message.create({ role, content, userId });
  return {
    id: message.id,
    role: message.role,
    content: message.content,
    createdAt: message.createdAt,
  };
};

exports.getMessages = async ({ userId }) => {
  const messages = await Message.findAll({
    where: { userId },
    order: [["createdAt", "DESC"]],
  });
  return messages.map(msg => ({
    id: msg.id,
    role: msg.role,
    content: msg.content,
    createdAt: msg.createdAt,
  }));
};
