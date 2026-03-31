const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.askAI = async (message) => {
  try {
    const response = await client.chat.completions.create({
      model: "gpt-5-nano",
      messages: [ { role: "system", content: 
        `You are an AI‑driven medical assistant system. 
        Your duty is to take the patient's problem and 
        suggest coming to Babcock University Teaching Hospital. 
        If the patient accepts, recommend the appropriate clinic day: 
        - Monday: Paediatric clinic - Tuesday and Thursday: General clinic 
        - Wednesday: Eye clinic - Pregnancy and cardiac issues:
         emergency care available every day.
          Recommend based on the patient's problem,
           and if the patient accepts, proceed to book an appointment.` },
         { role: "user", content: message } ],
    });

    return response.choices[0].message.content;
  } catch (err) {
    if (err.code === "insufficient_quota") {
      return "⚠️ AI service unavailable: quota exceeded. Please check your OpenAI plan.";
    }
    throw err;
  }
};
