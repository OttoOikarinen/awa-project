// Here will be all of the database calls.
import { ColumnField } from "./definitions";
import postgres from "postgres";
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

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