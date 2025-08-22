const express = require("express");
const { pool, testMySqlConnection } = require("./config/mysql");
require("dotenv").config();

const app = express();

const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function startServer() {
  try {
    await testMySqlConnection();
    console.log("Successfully connected to MySQL database!");

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.error("Error starting server: ", err.message);
    process.exit(1);
  }
}

startServer();

// app.use("/", require("./routes/schoolRoute"));
