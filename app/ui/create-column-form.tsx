'use client';

import { ColumnState } from '@/app/lib/definitions';
import Link from 'next/link';
import { Button } from '@/app/ui/buttons';
import { createColumn } from '@/app/lib/actions';
import { useActionState } from 'react';

export default function Form() {
  const initialState: ColumnState = { message: null, errors: {} };
  const [state, formAction] = useActionState(createColumn, initialState);
  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
   
        {/* Column name */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Column name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="column_name"
                name="column_name"
                type="text"
                placeholder="Enter column name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create column</Button>
      </div>
    </form>
  );
}
