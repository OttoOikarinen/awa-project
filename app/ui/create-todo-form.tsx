'use client';

import { ColumnField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/buttons';
import { createTodo, State } from '@/app/lib/actions';
import { useActionState } from 'react';

export default function Form({ columns }: { columns: ColumnField[] }) {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createTodo, initialState);
  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Column */}
        <div className="mb-4">
          <label htmlFor="column" className="mb-2 block text-sm font-medium">
            Choose a column
          </label>
          <div className="relative">
            <select
              id="column"
              name="columnId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="column-error"
            >
              <option value="" disabled>
                Select a column
              </option>
              {columns.map((column) => (
                <option key={column.id} value={column.id}>
                  {column.title}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="column-error" aria-live="polite" aria-atomic="true">
            {state.errors?.columnId &&
              state.errors.columnId.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Invoice Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Task
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="task"
                name="task"
                type="text"
                placeholder="Enter task"
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
        <Button type="submit">Create todo</Button>
      </div>
    </form>
  );
}
