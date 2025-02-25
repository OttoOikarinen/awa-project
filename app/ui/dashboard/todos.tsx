// Tähän pitää importtaa joku sql kutsu, joka sitten tekee tarvittavan määrän todoita. 

import { MarkTodoDoneButton, UpdateTodoButton, DeleteTodoButton } from '../buttons';
import { fetchTodos } from '@/app/lib/data';

export default async function TodoWrapper({
        column_id,
    }: {
        column_id: string
    }) {
    const todos = await fetchTodos(column_id);
    
    return (
        <div className=" bg-gray-100">
            {/* Map-funktio todojen listaamiseen. */ }
            {todos.map((todo) => (
                <Todo
                    key={todo.id} // Unique key for each column
                    id={todo.id}
                    task={todo.task}
                />
            ))}
        </div>
    );
};

export function Todo({
    id,
    task,
}: {
    id: string;
    task: string;
}) {
    return (
        <div className="max-w-sm p-4 bg-white shadow-lg rounded-2xl border border-gray-200 justify-center">
            <h2 className="text-md font-semibold text-gray-800">{task}</h2>

            
            <div className="flex gap-2 mt-4">
                <MarkTodoDoneButton id="1234"/>
                <UpdateTodoButton id="1234"/>
                <DeleteTodoButton id="1234"/>
            </div>
        </div>
    )
}