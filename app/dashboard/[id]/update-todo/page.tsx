// This page shows the update todo form. I've used Nextjs tutorial as a base for this file. 

import Form from '@/app/ui/edit-todo-form';
import {  fetchColumns, fetchSingleTodo, getUser } from '@/app/lib/data';
import { notFound, redirect } from 'next/navigation';
import { getUserFromCookie } from '@/app/lib/session';
import { revalidatePath } from 'next/cache';
 
export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;

    // Fetch the todo first, then user and then all the columns user has.
    const todo = await fetchSingleTodo(id);
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
      const columns = await fetchColumns(user.id)

  if (!todo) {
    notFound();
  }
  return (
    <main>
      <Form todo={todo} columns={columns}/>
    </main>
  );
}