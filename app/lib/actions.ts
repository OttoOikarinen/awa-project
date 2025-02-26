// All of the actions the buttons call will be here!
// I've used https://nextjs.org/docs/app/building-your-application/authentication heavily as a source for this file. 

'use server';
import { SignupFormSchema, State, FormState, FormSchema, LoginFormSchema, LoginFormState, ColumnFormSchema, ColumnState } from './definitions';
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
    
  // Validate form using Zod
  const validatedFields = CreateTodo.safeParse({
    columnId: formData.get('columnId'),
    task: formData.get('task'),
  });
   
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Todo.',
    };
  }
   
  // Prepare data for insertion into the database
  const { columnId, task } = validatedFields.data;
  const id = v4()

  // Get new todo index.
  const todos = await fetchTodos(columnId)
  const todo_index = todos.length || 0

  // Insert data into the database
  console.log(`Creating a new todo. id:${id}, userid: ${user.id}, task: ${task}, index: ${todo_index}  `)
  try {
    await sql`
      INSERT INTO todos (id, user_id, column_id, task, todo_index, done)
      VALUES ( ${id} ,${user.id}, ${columnId}, ${task}, ${todo_index}, false)
    `;
  } catch (error) {
    console.log(error)
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create todo.',
    };
  }
  console.log("Created todo.")
  // Revalidate the cache for the dashboard page and redirect the user.
  revalidatePath('/dashboard/');
  redirect('/dashboard/');
}

export async function registerUser(state: FormState, formData: FormData) {
  console.log("Registering user.")

  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { name, email, password } = validatedFields.data
  const hashedPassword = await bcrypt.hash(password, 10)
  const userID = v4()
  console.log(`Trying to create new user ${name} with email ${email} and password ${password}.`)
  console.log(`UserID: ${userID}`)
  try {
    await sql`
    INSERT INTO users (id, name, email, password, isAdmin)
    VALUES (${userID}, ${name}, ${email}, ${hashedPassword}, false)
    `;
    console.log("Created new user.")
  } catch (error) {
    console.log("Failed to create new user.")
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
  console.log("Authenticating.")
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }
  console.log("Form inputs were validated succesfully.")
  const { email, password } = validatedFields.data;
  const user = await getUser(email);
  if (!user) return null;
  console.log("In actions/loginUser. Found user, comparing passwords...")
  const passwordsMatch = await bcrypt.compare(password, user.password);
  if (passwordsMatch) {
    console.log("Passwords match! Redirecting...")
    createSession(user.id, user.email);
    redirect('/dashboard');
  }
}

export async function deleteUser() {
    console.log("Delete user.")
}

export async function createColumn(prevState: ColumnState, formData: FormData) {
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
 
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Column.',
    };
  }
 
  // Prepare data for insertion into the database
  const { column_name } = validatedFields.data;
  const id = v4()
  console.log(`Creating a new column. id:${id}, userid: ${user.id}, name: ${column_name}, index: ${column_index}  `)
  // Insert data into the database
  try {
    await sql`
      INSERT INTO columns (id, user_id, column_name, column_index)
      VALUES ( ${id}, ${user.id}, ${column_name}, ${column_index})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    console.log(error)
    return {
      message: 'Database Error: Failed to Create column.',
    };
  }
 
  // Revalidate the cache for the dashboard page and redirect the user.
  revalidatePath('/dashboard');
  redirect('/dashboard');
}

export async function modifyColumn() {
    console.log("Modifying column.")
}

export async function deleteColumn(column_id: string) {
  console.log("Deleting column.")
  const email = await getUserFromCookie();
  const user = await getUser(email)

  if (!user) {
    return
  }

  const this_column = await fetchSingleColumn(column_id);
  const all_columns = await fetchColumns(user.id);
  const lenghtOfArray = all_columns.length

  if (!this_column) {
    return
  }
  console.log(`Array lenght = ${lenghtOfArray}`)
  if (this_column.column_index + 1 < lenghtOfArray) {
    console.log(`Column index now ${this_column.column_index}`)
    var i  = this_column.column_index + 1
    while (i < lenghtOfArray) {

      await changeColumnIndex(all_columns[i].id, (all_columns[i].column_index - 1))
      i = i + 1;
    }
  }

  await deleteColumnFromDatabase(column_id)
  revalidatePath('/dashboard')
}

export async function moveColumnUp(column_id: string) {
  console.log("Move column up.")
  const email = await getUserFromCookie();
  const user = await getUser(email)

  if (!user) {
    return
  }

  const this_column = await fetchSingleColumn(column_id);
  const all_columns = await fetchColumns(user.id);
  const lenghtOfArray = all_columns.length

  if (!this_column) {
    return
  }

  if ((this_column?.column_index + 1) == lenghtOfArray) {
    console.log("index already as big as possible.");
    return
  } else {
    const column_above = all_columns[this_column.column_index + 1]
    const new_index_this_column = column_above.column_index
    const new_index_column_above = this_column.column_index

    await changeColumnIndex(this_column.id, new_index_this_column)
    await changeColumnIndex(column_above.id, new_index_column_above)

    revalidatePath('/dashboard')
  }
}

export async function moveColumnDown(column_id: string) {
  console.log("Move column down.")
  const email = await getUserFromCookie();
  const user = await getUser(email)

  if (!user) {
    return
  }

  const this_column = await fetchSingleColumn(column_id);
  const all_columns = await fetchColumns(user.id);

  if (!this_column) {
    return
  }

  if (this_column?.column_index == 0) {
    console.log("index already 0");
    return
  } else {
    const column_below = all_columns[this_column.column_index - 1]
    const new_index_this_column = column_below.column_index
    const new_index_column_below = this_column.column_index

    await changeColumnIndex(this_column.id, new_index_this_column)
    await changeColumnIndex(column_below.id, new_index_column_below)

    revalidatePath('/dashboard')
  }
}

export async function deleteTodo(todo_id: string, column_id: string) {
  console.log("Delete todo.")
  const this_todo = await fetchSingleTodo(todo_id);
  const all_todos = await fetchTodos(column_id);
  const lenghtOfArray = all_todos.length

  if (!this_todo) {
    return
  }
  console.log(`Array lenght = ${lenghtOfArray}`)
  if (this_todo.todo_index + 1 < lenghtOfArray) {
    console.log(`Todo index now ${this_todo.todo_index}`)
    var i  = this_todo.todo_index + 1
    while (i < lenghtOfArray) {

      await changeTodoIndex(all_todos[i].id, (all_todos[i].todo_index - 1))
      i = i + 1;
    }
  }

  await deleteTodoFromDatabase(todo_id)
  revalidatePath('/dashboard')
}

export async function modifyTodo() {
    console.log("Modify todo.")
}

export async function moveTodoUp(todo_id: string, column_id: string) {
  console.log("Move todo up.")

  const this_todo = await fetchSingleTodo(todo_id);
  const all_todos = await fetchTodos(column_id);
  const lenghtOfArray = all_todos.length

  if (!this_todo) {
    return
  }

  if ((this_todo?.todo_index + 1) == lenghtOfArray) {
    console.log("index already as big as possible.");
    return
  } else {
    const todo_above = all_todos[this_todo.todo_index + 1]
    const new_index_this_todo = todo_above.todo_index
    const new_index_todo_above = this_todo.todo_index

    await changeTodoIndex(this_todo.id, new_index_this_todo)
    await changeTodoIndex(todo_above.id, new_index_todo_above)

    revalidatePath('/dashboard')
  }
}

export async function moveTodoDown(todo_id: string, column_id: string) {
  console.log("Move todo down.")

  const this_todo = await fetchSingleTodo(todo_id);
  const all_todos = await fetchTodos(column_id);

  if (!this_todo) {
    return
  }

  if (this_todo?.todo_index == 0) {
    console.log("index already 0");
    return
  } else {
    const todo_above = all_todos[this_todo.todo_index - 1]
    const new_index_this_todo = todo_above.todo_index
    const new_index_todo_above = this_todo.todo_index

    await changeTodoIndex(this_todo.id, new_index_this_todo)
    await changeTodoIndex(todo_above.id, new_index_todo_above)

    revalidatePath('/dashboard')
  }
}
