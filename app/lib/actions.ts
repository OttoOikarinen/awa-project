// All of the actions the buttons call will be here!
// I've used https://nextjs.org/docs/app/building-your-application/authentication heavily as a source for this file. 

'use server';
import { SignupFormSchema, State, FormState, FormSchema, LoginFormSchema, LoginFormState } from './definitions';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import postgres from 'postgres';
import bcrypt from 'bcrypt';
import { v4 } from 'uuid'
import { createSession, deleteSession } from './session';
import { getUser } from './data';

const sql = postgres(process.env.DATABASE_URL!);

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
      INSERT INTO users (id, name, email, password)
      VALUES (${userID}, ${name}, ${email}, ${hashedPassword})
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
  redirect('/login')
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