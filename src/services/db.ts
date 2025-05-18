import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root', // Replace with your MySQL username
  password: '', // Replace with your MySQL password
  database: 'parcelease',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;