// This file displays the todos inside todowrapper.

import { UpdateTodoButton, DeleteTodoButton, MoveTodoDownButton, MoveTodoUpButton } from '../buttons';
import { fetchTodos } from '@/app/lib/data';

export default async function TodoWrapper({
        column_id,
    }: {
        column_id: string
    }) {
    // Fetch todos inside columns.
    const todos = await fetchTodos(column_id);
    
    return (
        <div className=" bg-gray-100">
            {/* Map all the todos. */ }
            {todos.map((todo) => (
                <Todo
                    key={todo.id}
                    id={todo.id}
                    task={todo.task}
                    column_id={column_id}
                />
            ))}
        </div>
    );
};

export function Todo({
    id,
    task,
    column_id,
}: {
    id: string;
    task: string;
    column_id: string;
}) {
    return (
        <div className="max-w-sm p-4 bg-white shadow-lg rounded-2xl border border-gray-200 justify-center">
            {/* Display task*/}
            <h2 className="text-md font-semibold text-gray-800">{task}</h2>

            {/* Container for buttons. */}
            <div className="flex gap-2 mt-4">
                <MoveTodoUpButton todo_id={id} column_id={column_id}/>
                <MoveTodoDownButton todo_id={id} column_id={column_id}/>
                <UpdateTodoButton id={id}/>
                <DeleteTodoButton todo_id={id} column_id={column_id}/>
            </div>
        </div>
    )
}