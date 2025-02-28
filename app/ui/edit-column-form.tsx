// User can edit column from this file. I have used as a base the nextjs tutorial create invoice file, and modified the funcitonality heavily to my purposes.
// I have retained the Tailwind UI, since it looks nice :)

'use client';

import { ColumnState, Column } from '@/app/lib/definitions';
import Link from 'next/link';
import { Button } from '@/app/ui/buttons';
import { updateColumn } from '@/app/lib/actions'
import { useActionState } from 'react';

export default function EditColumnForm({
  column,
}: {
  column: Column;
}) {
  const initialState: ColumnState = { message: null, errors: {} };
  const updateColumnWithId = updateColumn.bind(null, column);
  const [state, formAction] = useActionState(updateColumnWithId, initialState);
  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Column name */}
        <div className="mb-4">
          <label htmlFor="column_name" className="mb-2 block text-sm font-medium">
            Give name for column
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="column_name"
                name="column_name"
                type="text"
                defaultValue={column.column_name}
                placeholder="Enter column name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>

        
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit column</Button>
      </div>
    </form>
  );
}
