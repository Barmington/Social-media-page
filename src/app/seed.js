import { db } from '@/utils/db';
import dotenv from 'dotenv';
dotenv.config();

db = new pg.Pool({ connectionString: process.env.NEXT_POSTGRES });

db.query('INSERT INTO posts (content, clerk_id) VALUES ($1, $2)', [
  content,
  userId,
]);

db.query(
  'INSERT INTO users (first_name, last_name, username, clerk_id) VALUES ($1, $2, $3, $4)',
  [firstName, lastName, username, id]
);
