"use strict";
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
    host: process.env.API_DB_HOST,
    port: Number(process.env.API_DB_PORT),
    user: process.env.API_DB_USER,
    password: process.env.API_DB_PASSWORD,
    database: process.env.API_DB_NAME,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
  } else {
    console.log('Connected to PostgreSQL at:', res.rows[0].now);
  }
});