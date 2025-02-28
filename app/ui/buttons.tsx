// I have used Next.js nextjs-dashboard tutorial as source how to make buttons. The Button-function has been copied from there for aesthetic purposes. 
import clsx from 'clsx';
import { PencilIcon, PlusIcon, TrashIcon, CheckIcon, ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteColumn, deleteTodo, moveColumnDown, moveColumnUp, moveTodoDown, moveTodoUp } from '@/app/lib/actions'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        'flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
        className,
      )}
    >
      {children}
    </button>
  );
}

export function CreateTodoButton() {
  return (
    <Link
      href="/dashboard/create-todo"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create new todo</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateTodoButton({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/${id}/update-todo`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteTodoButton({ todo_id, column_id }: { todo_id: string, column_id: string }) {
  const deleteTodoWithId = deleteTodo.bind(null, todo_id, column_id);
  return (
    <>
      <form action={deleteTodoWithId}>
        <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
          <span className="sr-only">Delete todo</span>
          <TrashIcon className="w-5" />
        </button>
      </form>
    </>
  );
}

export function CreateColumnButton() {
  return (
    <Link
      href="/dashboard/create-column"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create new column</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateColumnButton({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/${id}/update-column`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteColumnButton({ id }: { id: string }) {
  const deleteColumnWithId = deleteColumn.bind(null, id);
  return (
    <>
      <form action={deleteColumnWithId}>
        <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
          <span className="sr-only">Delete column</span>
          <TrashIcon className="w-5" />
        </button>
      </form>
    </>
  );
}

export async function MoveColumnDownButton({id}: {id: string}){
  const moveColumnDownWithID = moveColumnDown.bind(null, id);
  return (
    <>
      <form action={moveColumnDownWithID}>
        <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
          <span className="sr-only">Move columm down</span>
          <ArrowUpIcon className="w-5" />
        </button>
      </form>
    </>
  );


}

export async function MoveColumnUpButton({id}: {id: string}){
  const moveColumnUpWithID = moveColumnUp.bind(null, id);
  return (
    <>
      <form action={moveColumnUpWithID}>
        <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
          <span className="sr-only">Move column up</span>
          <ArrowDownIcon className="w-5" />
        </button>
      </form>
    </>
  );
}

export async function MoveTodoDownButton({todo_id, column_id}: {todo_id: string; column_id: string;}){
  const moveTodoDownWithID = moveTodoDown.bind(null, todo_id, column_id);
  return (
    <>
      <form action={moveTodoDownWithID}>
        <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
          <span className="sr-only">Move todo down</span>
          <ArrowUpIcon className="w-5" />
        </button>
      </form>
    </>
  );


}

export async function MoveTodoUpButton({todo_id, column_id }: {todo_id: string; column_id: string;}){
  const moveTodoUpWithID = moveTodoUp.bind(null, todo_id, column_id);
  return (
    <>
      <form action={moveTodoUpWithID}>
        <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
          <span className="sr-only">Move todo up</span>
          <ArrowDownIcon className="w-5" />
        </button>
      </form>
    </>
  );
}