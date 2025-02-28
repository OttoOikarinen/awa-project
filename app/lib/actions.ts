// Most of the server side actions live here. The buttons call these functions.
// I've used https://nextjs.org/docs/app/building-your-application/authentication heavily as a source for authentication actions.
// Also form validation has been done with similar functions as in the Nextjs tutorial. 

'use server';
import { SignupFormSchema, State, FormState, FormSchema, LoginFormSchema, LoginFormState, ColumnFormSchema, ColumnState, Column, Todo } from './definitions';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import postgres from 'postgres';
import bcrypt from 'bcrypt';
import { v4 } from 'uuid'
import { createSession, deleteSession, getUserFromCookie } from './session';
import { fetchColumns, fetchTodos, getUser, fetchSingleColumn, changeColumnIndex, fetchSingleTodo, changeTodoIndex, deleteColumnFromDatabase, deleteTodoFromDatabase, } from './data';

const sql = postgres(process.env.DATABASE_URL!);

const CreateTodo = FormSchema.omit({ id: true, date: true });
export async function createTodo(prevState: State, formData: FormData) {

  // First get user.
  const email = await getUserFromCookie();
  if (email == null) {
    revalidatePath('/dashboard/');
    redirect('/dashboard/');
  }
  const user = await getUser(email)
  if (!user) {
    return {
      message: "Couldn't find user."
    }
  }
    
  // Validate form using Zod.
  const validatedFields = CreateTodo.safeParse({
    columnId: formData.get('columnId'),
    task: formData.get('task'),
  });
   
  // If form validation fails, return errors.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Todo.',
    };
  }
   
  // This data will be inserted into database.
  const { columnId, task } = validatedFields.data;
  const id = v4()

  // Get new todo index.
  const todos = await fetchTodos(columnId)
  const todo_index = todos.length || 0 // IF no todos, index = 0.

  // Create new todo to the database.
  // console.log(`Creating a new todo. id:${id}, userid: ${user.id}, task: ${task}, index: ${todo_index}  `)
  try {
    await sql`
      INSERT INTO todos (id, user_id, column_id, task, todo_index, done)
      VALUES ( ${id} ,${user.id}, ${columnId}, ${task}, ${todo_index}, false)
    `;
  } catch (error) {
    console.log(error)
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to create todo.',
    };
  }
  // Revalidate the cache for the dashboard page and redirect the user.
  revalidatePath('/dashboard/');
  redirect('/dashboard/');
}

export async function registerUser(state: FormState, formData: FormData) {

  // Validate the form with zod.
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  })

  // If not succesfull, return errors.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  // Prepare data to be inserted into database.
  const { name, email, password } = validatedFields.data
  const hashedPassword = await bcrypt.hash(password, 10)
  const userID = v4()

  //console.log(`Trying to create new user ${name} with email ${email} and password ${password}.`)
  //console.log(`UserID: ${userID}`)
  try {
    await sql`
    INSERT INTO users (id, name, email, password, isAdmin)
    VALUES (${userID}, ${name}, ${email}, ${hashedPassword}, false)
    `;
  } catch (error) {
    console.log(error)
    return {
      message: 'Database Error: failed to create new user.'
    }
  }
  createSession(userID, email)
  redirect('/dashboard')
}

export async function logout() {
  deleteSession()
  redirect('/')
}

export async function loginUser(state: LoginFormState, formData: FormData) {

  // Check form with zod.
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  // Not successful, return errors.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { email, password } = validatedFields.data;

  // Get user who is trying to login.
  const user = await getUser(email);
  if (!user) return null;

  // Check if passwords match.
  const passwordsMatch = await bcrypt.compare(password, user.password);
  if (passwordsMatch) {
    console.log("Passwords match! Redirecting...")
    createSession(user.id, user.email);
    redirect('/dashboard');
  } else {
    redirect('/login')
  }
}

// Not implemented yet.
export async function deleteUser() {
    console.log("Delete user.")
}

export async function createColumn(prevState: ColumnState, formData: FormData) {

  // Get user first.
  const email = await getUserFromCookie();
  if (email == null) {
    revalidatePath('/dashboard/');
    redirect('/dashboard/');
  }
  const user = await getUser(email)
  if (!user) {
    return {
      message: "Couldn't find user."
    }
  }
  
  // Get new column_index.
  const columns = await fetchColumns(user.id)
  const column_index = columns.length || 0
  
  // Validate form using Zod
  const validatedFields = ColumnFormSchema.safeParse({
    column_name: formData.get('column_name'),
  });
 
  // If form validation fails, return errors.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Column.',
    };
  }
 
  // Prepare data for insertion into the database
  const { column_name } = validatedFields.data;
  const id = v4()

  // Insert data into the database
  try {
    await sql`
      INSERT INTO columns (id, user_id, column_name, column_index)
      VALUES ( ${id}, ${user.id}, ${column_name}, ${column_index})
    `;
  } catch (error) {
    // Log error.
    console.log(error)
    return {
      message: 'Database Error: Failed to Create column.',
    };
  }
 
  // Reload data and direct user to dashboard.
  revalidatePath('/dashboard');
  redirect('/dashboard');
}

export async function updateColumn(column: Column, prevState: ColumnState, formData: FormData) {  
  // Zod.
  const validatedFields = ColumnFormSchema.safeParse({
    column_name: formData.get('column_name'),
  });
 
  // If not successfull, return errors.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Column.',
    };
  }
 
  const { column_name } = validatedFields.data;

  // Update specific column.
  try {
    await sql`
      UPDATE columns
      SET column_name=${column_name}
      WHERE id=${column.id}
    `;
  } catch (error) {
    // Log errors.
    console.log(error)
    return {
      message: 'Database Error: Failed to Create column.',
    };
  }
 
  // Revalidate the cache for the dashboard page and redirect the user.
  revalidatePath('/dashboard');
  redirect('/dashboard');
}

export async function deleteColumn(column_id: string) {
  // Get user from session.
  const email = await getUserFromCookie();
  const user = await getUser(email)

  if (!user) {
    return
  }

  // Get this column and all other columns user have.
  const this_column = await fetchSingleColumn(column_id);
  const all_columns = await fetchColumns(user.id);
  const lenghtOfArray = all_columns.length

  if (!this_column) {
    return
  }

  // Since the display of columns is arranged based on the index they have, all indexes have to be updated, when one is removed.
  // So we change the index of all higher columns.
  if (this_column.column_index + 1 < lenghtOfArray) {
    var i  = this_column.column_index + 1
    while (i < lenghtOfArray) {

      await changeColumnIndex(all_columns[i].id, (all_columns[i].column_index - 1))
      i = i + 1;
    }
  }
  // And finally delete the column.
  await deleteColumnFromDatabase(column_id)
  revalidatePath('/dashboard')
}

export async function moveColumnUp(column_id: string) {
  // First get user.
  const email = await getUserFromCookie();
  const user = await getUser(email)

  if (!user) {
    return
  }

  // Get this column and all columns the user have.
  const this_column = await fetchSingleColumn(column_id);
  const all_columns = await fetchColumns(user.id);
  const lenghtOfArray = all_columns.length

  if (!this_column) {
    return
  }

  // Column might already be at the last place in the array, so it cannot be moved anymore further.
  if ((this_column?.column_index + 1) == lenghtOfArray) {
    return
  } else {
    // Else change the index with the column after it.
    const column_above = all_columns[this_column.column_index + 1]
    const new_index_this_column = column_above.column_index
    const new_index_column_above = this_column.column_index

    await changeColumnIndex(this_column.id, new_index_this_column)
    await changeColumnIndex(column_above.id, new_index_column_above)

    revalidatePath('/dashboard')
  }
}

export async function moveColumnDown(column_id: string) {
  // First get user.
  const email = await getUserFromCookie();
  const user = await getUser(email)

  if (!user) {
    return
  }

  // Get this column and all columns the user have.
  const this_column = await fetchSingleColumn(column_id);
  const all_columns = await fetchColumns(user.id);

  if (!this_column) {
    return
  }

  // Column might already be at the first place in the array, so it cannot be moved anymore further.
  if (this_column?.column_index == 0) {
    return
  } else {
    // Else change the index with the column before it.
    const column_below = all_columns[this_column.column_index - 1]
    const new_index_this_column = column_below.column_index
    const new_index_column_below = this_column.column_index

    await changeColumnIndex(this_column.id, new_index_this_column)
    await changeColumnIndex(column_below.id, new_index_column_below)

    revalidatePath('/dashboard')
  }
}

export async function deleteTodo(todo_id: string, column_id: string) {
  // Fetch this todo and all todos in the same column.
  const this_todo = await fetchSingleTodo(todo_id);
  const all_todos = await fetchTodos(column_id);
  const lenghtOfArray = all_todos.length

  if (!this_todo) {
    return
  }
  // If the todo is not the last on in the array, update all todos after it with new index.
  if (this_todo.todo_index + 1 < lenghtOfArray) {
    var i  = this_todo.todo_index + 1
    while (i < lenghtOfArray) {

      await changeTodoIndex(all_todos[i].id, (all_todos[i].todo_index - 1))
      i = i + 1;
    }
  }
  // Finally delete the todo.
  await deleteTodoFromDatabase(todo_id)
  revalidatePath('/dashboard')
}

export async function updateTodo(todo: Todo, prevState: State, formData: FormData) {

  // Validate with Zod.
  const validatedFields = CreateTodo.safeParse({
    columnId: formData.get('columnId'),
    task: formData.get('task'),
  });
   
  // Return errors if not success.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Todo.',
    };
  }
   
  const { columnId, task } = validatedFields.data;
  
  // Update todo with new task and column. 
  try {
    await sql`UPDATE todos SET task=${task}, column_id=${columnId} WHERE id=${todo.id}`;
  } catch (error) {
    // Log errors.
    console.log(error)
    return {
      message: 'Database Error: Failed to Create todo.',
    };
  }

  // Reload the data and redirect. 
  revalidatePath('/dashboard');
  redirect('/dashboard');
}

export async function moveTodoUp(todo_id: string, column_id: string) {

  // Fetch this todo and other todos in the same column. 
  const this_todo = await fetchSingleTodo(todo_id);
  const all_todos = await fetchTodos(column_id);
  const lenghtOfArray = all_todos.length

  if (!this_todo) {
    return
  }

  // The todo might be the last one already, cannot be moved further.
  if ((this_todo?.todo_index + 1) == lenghtOfArray) {
    return
  } else {
    // Else switch indexed with the todo after it. 
    const todo_above = all_todos[this_todo.todo_index + 1]
    const new_index_this_todo = todo_above.todo_index
    const new_index_todo_above = this_todo.todo_index

    await changeTodoIndex(this_todo.id, new_index_this_todo)
    await changeTodoIndex(todo_above.id, new_index_todo_above)

    revalidatePath('/dashboard')
  }
}

export async function moveTodoDown(todo_id: string, column_id: string) {

  // Fetch this todo and other todos in the same column. 
  const this_todo = await fetchSingleTodo(todo_id);
  const all_todos = await fetchTodos(column_id);

  if (!this_todo) {
    return
  }

  // Todo might already be first, do nothing.
  if (this_todo?.todo_index == 0) {
    return
  } else {
    // Else change the index with the todo before it.
    const todo_above = all_todos[this_todo.todo_index - 1]
    const new_index_this_todo = todo_above.todo_index
    const new_index_todo_above = this_todo.todo_index

    await changeTodoIndex(this_todo.id, new_index_this_todo)
    await changeTodoIndex(todo_above.id, new_index_todo_above)

    revalidatePath('/dashboard')
  }
}
