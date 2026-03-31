const services = require('../services/chatServices');

exports.n8nMessage = async (req, res, next) => {
  try {
    const result = await services.processMessage({
      content: req.body.message,
      userId: req.body.userId || null,
      source: 'n8n'
    });
    res.json(result);
  } catch (err) {
    next(err);
  }
};
