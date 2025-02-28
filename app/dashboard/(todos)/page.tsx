// This page shows all the user's todos (if there are any).

import ColumnWrapper from '@/app/ui/dashboard/columns';
import Link from 'next/link';

export default function Todos() {
    return (
        <div>
            <div className="flex gap-4">
                <Link
                  href="/dashboard/create-todo"
                  className="px-4 py-2 border border-gray-500 text-gray-900 rounded-lg hover:bg-gray-100 transition"
                >
                  Create Todo
                </Link>
                <Link
                  href="/dashboard/create-column"
                  className="px-4 py-2 border border-gray-500 text-gray-900 rounded-lg hover:bg-gray-100 transition"
                >
                  Create Column
                </Link>
            </div>
            <ColumnWrapper />
        </div>
    )
}