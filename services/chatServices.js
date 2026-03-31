const Message = require('../models/chat');   
const ai = require('./openAiService');
const Doctor = require('../models/Doctor');
const appointmentService = require('../services/appointmentService');

// Helper: assign doctor dynamically
async function assignDoctor(problem) {
  const text = problem.toLowerCase();
  let specialty = "General Medicine";

  if (/child|baby|paediatric|infant|kid/.test(text)) specialty = "Paediatrics";
  else if (/eye|vision|sight|blurred|ophthalmology/.test(text)) specialty = "Ophthalmology";
  else if (/pregnancy|pregnant|gynecology|obgyn/.test(text)) specialty = "Obstetrics & Gynecology";
  else if (/cardiac|heart|chest pain|palpitations/.test(text)) specialty = "Cardiology";

  let doctor = await Doctor.findOne({ where: { specialty } });
  if (!doctor) {
    // ✅ fallback to a general doctor if none found
    doctor = await Doctor.findOne({ where: { specialty: "General Medicine" } });
  }
  return doctor;
}

// Main chat processor
exports.processMessage = async ({ content, userId, source }) => {
  try {
    // ✅ Ensure user is logged in
    if (!userId) {
      return {
        role: "assistant",
        content: "You must be logged in to chat or book appointments.",
      };
    }

    // Save user message
    const userMsg = await Message.create({ role: 'user', content, userId, source });

    // Get AI reply with fallback
    let aiReply;
    try {
      aiReply = await ai.askAI(content);
    } catch {
      aiReply = "Sorry, I couldn’t process that right now.";
    }

    // Detect booking intent
    const positiveIntent = /\b(yes|okay|accept|book|schedule|appointment|meet|consult)\b/i.test(content);
    const negativeIntent = /\b(no|not|don't|cancel|decline|reject)\b/i.test(content);

    let appointment;
    if (positiveIntent && !negativeIntent) {
      const doctor = await assignDoctor(content);

      if (!doctor) {
        aiReply = "No doctors are available right now. Please try again later.";
      } else {
        appointment = await appointmentService.createAppointment({
          userId,
          doctorId: doctor.id,
          date: new Date(),
          reason: content,
          source
        });

        aiReply = `Your appointment has been booked with Dr. ${doctor.name} (${doctor.specialty}). Please arrive 15 minutes early.`;

        await userMsg.update({ appointmentId: appointment.id });
      }
    }

    // Save assistant message
    const botMsg = await Message.create({
      role: 'assistant',
      content: aiReply,
      userId,
      source,
      appointmentId: appointment ? appointment.id : null
    });

    return botMsg;
  } catch (error) {
    console.error("ChatService Error:", error);
    return {
      role: "assistant",
      content: "Something went wrong while processing your request.",
    };
  }
};

// Retrieve all messages for a user
exports.getMessages = async (userId) => {
  if (!userId) throw new Error("Missing userId");

  return await Message.findAll({
    where: { userId },
    order: [["createdAt", "ASC"]],
  });
};
