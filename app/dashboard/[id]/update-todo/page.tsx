import Form from '@/app/ui/edit-todo-form';
import {  fetchColumns, fetchSingleTodo, getUser } from '@/app/lib/data';
import { notFound, redirect } from 'next/navigation';
import { getUserFromCookie } from '@/app/lib/session';
import { revalidatePath } from 'next/cache';
 
export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
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
      
      // Get new column_index.
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