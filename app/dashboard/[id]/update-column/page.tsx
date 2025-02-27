import Form from '@/app/ui/edit-column-form';
import {  fetchSingleColumn } from '@/app/lib/data';
import { notFound } from 'next/navigation';
 
export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    const column = await fetchSingleColumn(id);

  if (!column) {
    notFound();
  }
  return (
    <main>
      <Form column={column} />
    </main>
  );
}