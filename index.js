
const express = require("express");
const cors = require("cors");
const app = express();

const sequelize = require("./config/db");

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use("/api/chat", require("./routes/chatRoutes"));

const PORT= 3000;
sequelize.sync({ force: true })
  .then(() => {
    console.log("Database synced");
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch(err => {
    console.error("DB sync failed:", err);
  });