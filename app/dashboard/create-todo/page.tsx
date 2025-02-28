// Shows form to create todo.

import Form from '@/app/ui/create-todo-form';
import { fetchColumns, getUser } from '@/app/lib/data';
import { getUserFromCookie } from '@/app/lib/session';
import { redirect } from 'next/navigation';
 
export default async function Page() {
  const email = await getUserFromCookie();
  const user = await getUser(email)

  if (!user) {
    redirect("/dashboard")
  }
  const columns = await fetchColumns(user.id);
 
  return (
    <main>
      <Form columns={columns} />
    </main>
  );
}