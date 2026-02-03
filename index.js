
const express = require("express");
const app = express();

const sequelize = require("./config/db");

app.use(express.json());

app.use("/api/chat", require("./routes/chatRoutes"));

const PORT= 3000;
sequelize.sync()
  .then(() => {
    console.log("Database synced");
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch(err => {
    console.error("DB sync failed:", err);
  });