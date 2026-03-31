
const express = require("express");
const cors = require("cors");
const app = express();
const sequelize = require("./config/db");
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use('/api/users', require('./routes/authRoutes')); 
app.use('/api/chat', require('./routes/chatRoutes')); 
app.use('/api/admin', require('./routes/adminroute')); 
app.use('/api/webhook', require('./routes/webhookRoutes'));
app.use('/api/doctors', require('./routes/doctorRoutes'));
app.use('/api/appointments', require('./routes/appointmentRoutes'));
app.get('/health', (req, res) => {
  res.send('HealthCare API is running');
});
const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: true })
  .then(() => {
    console.log("Database synced");
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch(err => {
    console.error("DB sync failed:", err);
  });