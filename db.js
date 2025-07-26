import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve('F:/Login Systems/Backend/.env') });

const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

db.connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch(err => {
    console.error("Failed to connect to PostgreSQL:", err.message);
    process.exit(1);
  });

db.on('error', (err) => {
  console.error("Unexpected error on idle PostgreSQL client:", err);
  process.exit(1);
});

export const query = (text, params) => db.query(text, params);
export default db;
