const axios = require('axios');

exports.sendEmailWorkflow = async ({ email, message }) => {
  await axios.post(
    'https://your-n8n.app/webhook/chat-email',
    {
      email,
      message
    }
  );
};
