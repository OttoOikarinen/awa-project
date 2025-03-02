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
        <div className="w-full max-w-md bg-gray-100">
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
        <div className="w-full max-w-md p-4 mt-2 mb-2 bg-white shadow-lg rounded-2xl border border-gray-200 justify-right">
            {/* Display task*/}
            <h2 className="text-md break-words font-semibold text-gray-800">{task}</h2>

            {/* Container for buttons.*/}
            <div className="flex flex-wrap justify-start gap-2 mt-4">
                <MoveTodoUpButton todo_id={id} column_id={column_id}/>
                <MoveTodoDownButton todo_id={id} column_id={column_id}/>
                <UpdateTodoButton id={id}/>
                <DeleteTodoButton todo_id={id} column_id={column_id}/>
            </div>
        </div>
    )
}