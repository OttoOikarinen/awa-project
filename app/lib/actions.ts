// All of the actions the buttons call will be here!
'use server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import postgres from 'postgres';
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const FormSchema = z.object({
    id: z.string(),
    columnId: z.string({
      invalid_type_error: 'Please select a column.',
    }),
    task: z.string({
        invalid_type_error: 'Please insert task.',
      }),
    date: z.string(),
  });

export type State = {
    errors?: {
      columnId?: string[];
      task?: string[];
    } | null;
    message?: string | null;
  };

const CreateTodo = FormSchema.omit({ id: true, date: true });
export async function createTodo(prevState: State, formData: FormData) {
    // Here you still have to get user id!!
    const userId = "JARkko"
    const todo_index = 1
    
    
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
    const date = new Date().toISOString().split('T')[0];
   
    // Insert data into the database
    try {
      await sql`
        INSERT INTO todos (user_id, column_id, task, todo_index, done)
        VALUES (${userId}, ${columnId}, ${task}, ${todo_index}, false)
      `;
    } catch (error) {
      // If a database error occurs, return a more specific error.
      return {
        message: 'Database Error: Failed to Create todo.',
      };
    }
   
    // Revalidate the cache for the dashboard page and redirect the user.
    revalidatePath('/dashboard/');
    redirect('/dashboard/');
}

export async function registerUser() {
    console.log("Registering user user.")
}

export async function authenticate() {
    console.log("Authenticating.")
}

export async function deleteUser() {
    console.log("Delete user.")
}

export async function createColumn() {
    console.log("Creating new column.")
}

export async function modifyColumn() {
    console.log("Modifying column.")
}

export async function deleteColumn(id: string) {
    console.log("Deleting column.")
}

export async function moveColumnUp() {
    console.log("Move column up.")
}

export async function moveColumnDown() {
    console.log("Move column down.")
}

export async function deleteTodo(id: string) {
    console.log("Delete todo.")
}

export async function modifyTodo() {
    console.log("Modify todo.")
}

export async function moveTodoUp() {
    console.log("Move todo up.")
}

export async function moveTodoDown() {
    console.log("Move todo down.")
}

export async function markTodoDone(id: string) {
    console.log("Mark todo done!")
}