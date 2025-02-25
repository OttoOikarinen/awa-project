// Here will be all of the database calls.
import { ColumnField, User } from "./definitions";
import postgres from "postgres";
const sql = postgres(process.env.DATABASE_URL!);

export async function fetchColumns() {
    try {
      const columns = await sql<ColumnField[]>`
        SELECT
          id,
          column_name
        FROM columns
        ORDER BY name ASC
      `;
  
      return columns;
    } catch (err) {
      console.error('Database Error:', err);
      throw new Error('Failed to fetch all columns.');
    }
}

export async function getUser(email: string): Promise<User | undefined> {
  console.log("Getting user.")
  try {
    const user = await sql<User[]>`SELECT * FROM users WHERE email=${email}`;
    console.log("Got user.")
    console.log(user)
    return user[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}