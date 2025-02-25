import { z } from 'zod';

export type User = {
    id: string,
    name: string,
    email: string,
    password: string
}

export type Column = {
    id: string,
    user_id: string,
    column_name: string,
    column_index: number,
}

export type Todo = {
    id: string,
    user_id: string,
    column_id: string,
    task: string,
    todo_index: number,
    done: boolean
}

export type ColumnField = {
    id: string,
    column_name: string,
    column_index: number
}

export const SignupFormSchema = z.object({
    name: z
      .string()
      .min(2, { message: 'Name must be at least 2 characters long.' })
      .trim(),
    email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
    password: z
      .string()
      .min(8, { message: 'Be at least 8 characters long' })
      .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
      .regex(/[0-9]/, { message: 'Contain at least one number.' })
      .regex(/[^a-zA-Z0-9]/, {
        message: 'Contain at least one special character.',
      })
      .trim(),
  })
   
export type FormState =
    | {
        errors?: {
          name?: string[]
          email?: string[]
          password?: string[]
        }
        message?: string
      }
    | undefined;

export const FormSchema = z.object({
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

export type SessionPayload = {
    userId: string,
    expiresAt: Date,
    isAdmin: boolean,
    email: string
}

export const LoginFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .trim(),
})
 
export type LoginFormState =
  | {
      errors?: {
        email?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined | null;

export const ColumnFormSchema = z.object({
  column_name: z.string({
    invalid_type_error: 'Please insert name for column.',
  }),
});

export type ColumnState = {
  errors?: {
    column_name?: string[];
  } | null;
  message?: string | null;
};