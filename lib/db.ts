// lib/db.ts
import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',          // Jika env kosong, otomatis pakai 'root'
  password: process.env.DB_PASSWORD || '',      // Jika env kosong, otomatis tanpa password
  database: process.env.DB_NAME || 'db_tumtim',  // Jika env kosong, otomatis pakai 'db_tumtim'
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});