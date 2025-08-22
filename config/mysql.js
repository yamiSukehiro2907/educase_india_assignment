const mysql = require("mysql2/promise");

require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function testMySqlConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("Connected to mysql database");
    connection.release();
  } catch (err) {
    console.error("Error connecting to database: ", err.message);
    process.exit(1);
  }
}

module.exports = {
  pool,
  testMySqlConnection,
};
