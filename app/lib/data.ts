// Here will be all of the database calls.
import { Column, ColumnField, Todo, User } from "./definitions";
import postgres from "postgres";
const sql = postgres(process.env.DATABASE_URL!);

export async function fetchColumns(user_id: string) {
    try {
      const columns = await sql<ColumnField[]>`
        SELECT
          id,
          column_name,
          column_index
        FROM columns
        WHERE user_id=${user_id}
        ORDER BY column_index ASC
      `;
      return columns;
    } catch (err) {
      console.error('Database Error:', err);
      throw new Error('Failed to fetch all columns.');
    }
}

export async function fetchSingleColumn(column_id: string) {
  try {
    const column = await sql<Column[]>`
    SELECT 
      id,
      user_id,
      column_name,
      column_index
    FROM columns 
    WHERE id = ${column_id}
    `;
    return column[0]
  } catch(error) {
    console.log(error)
  }
}

export async function fetchTodos(column_id: string) {
  try {
    const todos = await sql<Todo[]>`
      SELECT
        id,
        user_id,
        column_id,
        task,
        todo_index,
        done
      FROM todos
      WHERE (column_id=${column_id}
      AND done=false)
      ORDER BY todo_index ASC
    `;

    return todos;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all columns.');
  }
}

export async function fetchSingleTodo(todo_id: string) {
  try {
    const todo = await sql<Todo[]>`
    SELECT 
      id,
      user_id,
      column_id,
      task,
      todo_index,
      done
    FROM todos 
    WHERE id = ${todo_id}
    AND done=false
    `;
    return todo[0]
  } catch(error) {
    console.log(error)
  }
}

export async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User[]>`SELECT * FROM users WHERE email=${email}`;
    return user[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function changeColumnIndex(column_id: string, new_index: number) {
  console.log("Changing column index.")
  try {
    await sql`
    UPDATE columns
    SET column_index = ${new_index}
    WHERE id = ${column_id}`;
    return true
  } catch (error) {
    console.log(error)
  };
}

export async function changeTodoIndex(todo_id: string, new_index: number) {
  console.log("Changing todo index.")
  try {
    await sql`
    UPDATE todos
    SET todo_index = ${new_index}
    WHERE id = ${todo_id}
    AND done = false`;
    return true
  } catch (error) {
    console.log(error)
  };
}

export async function deleteColumnFromDatabase(column_id: string) {
  try {
    await sql`DELETE FROM columns WHERE id=${column_id}`;
  } catch (error) {
    console.log(error)
  }   
}

export async function deleteTodoFromDatabase(todo_id: string) {
  try {
    await sql`DELETE FROM todos WHERE id=${todo_id}`;
  } catch (error) {
    console.log(error)
  } 
}

export async function fetchUserAmount() {
  try {
    const users = await sql<User[]>`SELECT * FROM users`;
    const userAmount = users.length;
    return userAmount || 0;
  } catch (error) {
    console.log(error)
    return 0
  }
}

export async function fetchTodoAmount() {
  try {
    const todos = await sql<Todo[]>`SELECT * FROM todos`;
    const todoAmount = todos.length;
    return todoAmount || 0;
  } catch (error) {
    console.log(error)
    return 0
  }
}

export async function fetchTodoAmountForUser(user_id: string) {
  try {
    const todos = await sql<Todo[]>`SELECT * FROM todos WHERE user_id = ${user_id}`;
    const todoAmount = todos.length
    return todoAmount || 0;
  } catch (error) {
    console.log(error)
    return 0;
  }
}
