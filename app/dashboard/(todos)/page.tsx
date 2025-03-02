// This page shows all the user's todos (if there are any).

import ColumnWrapper from '@/app/ui/dashboard/columns';
import Link from 'next/link';

export default function Todos() {
    return (
        <div>
            <div className="flex gap-4">
                <Link
                  href="/dashboard/create-todo"
                  className="rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-blue-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                >
                  Create Todo
                </Link>
                <Link
                  href="/dashboard/create-column"
                  className="rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-blue-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                >
                  Create Column
                </Link>
            </div>
            <ColumnWrapper />
        </div>
    )
}