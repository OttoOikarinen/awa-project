// Tähän pitää importtaa joku sql kutsu, joka sitten tekee tarvittavan määrän todoita. 
// Pitää importtaa myös actionit noille napeille.
import {
    CheckIcon,
    PencilIcon,
    TrashIcon,
} from '@heroicons/react/24/outline';

export default async function TodoWrapper() {
    // const todoList = getTodos() etc...
    {/* Tähän tarvitaan map-funktio todojen listaamiseen */ }
    const Todos = [
        { id: 1, title: "Buy Groceries" },
        { id: 2, title: "Study React"},
        { id: 3, title: "Workout"},
        { id: 4, title: "Read a Book"},
        { id: 5, title: "Meeting at 3 PM"},
    ]
    return (
        <div className=" bg-gray-100">
            {/* Tähän tarvitaan map-funktio todojen listaamiseen. */ }
            <Todo id="1" task="Pese pyykit, tämä on tosi vaikeeta ja tarvitsee paljon apua."/>
            <Todo id="2" task="Koodaa todo-appi"/>
            <Todo id="3" task="Soita saksofonia"/>
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
                <button className="px-1 py-1 text-sm rounded-lg hover:bg-green-500 border-2 border-gray-400">
                    <CheckIcon className="w-5 h-5 "/>
                </button>
                <button className="px-1 py-1 text-sm rounded-lg hover:bg-yellow-300 border-2 border-gray-400">
                    <PencilIcon className="w-5 h-5"/>
                </button>
                
                <button className="px-1 py-1 text-sm rounded-lg hover:bg-red-500 border-2 border-gray-400">
                    <TrashIcon className="w-5 h-5"/>
                </button>
            </div>
        </div>
    )
}