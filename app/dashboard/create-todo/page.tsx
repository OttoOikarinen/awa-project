import Form from '@/app/ui/create-todo-form';
import { fetchColumns } from '@/app/lib/data';
 
export default async function Page() {
  const columns = await fetchColumns();
 
  return (
    <main>
      <Form columns={columns} />
    </main>
  );
}