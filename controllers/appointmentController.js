const service = require('../services/appointmentService');
const axios = require("axios");
const transporter = require("../utils/mailer");

exports.createAppointment = async (req, res) => {
  try {
    const data = await service.createAppointment({
      ...req.body,
      userId: req.user?.id || req.body.userId
    });

    // Try webhook first
    try {
      await axios.post(process.env.N8N_WEBHOOK_URL, {
        name: req.user?.username || req.body.name,
        email: req.user?.email || req.body.email,
        date: data.date,
        appointmentId: data.id
      }, {
        headers: { "x-webhook-secret": process.env.N8N_SECRET }
      });
    } catch (webhookErr) {
      console.error("Webhook failed, sending email instead:", webhookErr.message);

      // Fallback: send email with Nodemailer
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: req.user?.email || req.body.email,
        subject: "Appointment Confirmation",
        text: `Hello ${req.user?.username || req.body.name},\n\nYour appointment is booked for ${data.date}.\n\nAppointment ID: ${data.id}`
      });
    }

    res.status(201).json(data);
  } catch (err) {
    console.error("Appointment Error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

    exports.getMyAppointments = async(req,res)=>{
        try{
            const data = await service.getAppointmentsByUserId(req.user.id);

            res.json(data);
        }catch(err){
            res.status(500).json({error:err.message});
        }
    }
exports.getAppointments = async(req,res)=>{
    try{
        const data = await service.getAppointments();
        res.json(data);
    }catch(err){
        res.status(500).json({error:err.message});
    }
}
exports.updateAppointment = async(req,res)=>{
    try{
        const data = await service.updateAppointment(req.params.id,req.body);
        res.status(200).json(data);
    }catch(err){
        res.status(500).json({error:err.message});
    }
}
exports.deleteAppointment = async(req,res)=>{
    try{
        const data = await service.deleteAppointment(req.params.id);
        res.status(200).json({message:'Appointment deleted'});
    }catch(err){
        res.status(500).json({error:err.message});
    }
}