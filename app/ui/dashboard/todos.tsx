// Tähän pitää importtaa joku sql kutsu, joka sitten tekee tarvittavan määrän todoita. 


export default async function TodoWrapper() {
    // const todoList = getTodos() etc...
    const Todos = [
        { id: 1, title: "Buy Groceries" },
        { id: 2, title: "Study React"},
        { id: 3, title: "Workout"},
        { id: 4, title: "Read a Book"},
        { id: 5, title: "Meeting at 3 PM"},
    ]
    return (
        <div className=" bg-gray-100  ">
            {/* Tähän tarvitaan map-funktio todojen listaamiseen. */ }
            <Todo id="1" task="Pese pyykit"/>
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
    // Tämä sit vaan displayaa yhden Todon.

    return (
        <div className="max-w-md p-4 bg-white shadow-lg rounded-2xl border border-gray-200">
            <h2 className="text-md font-semibold text-gray-800">{task}</h2>

            
            <div className="flex justify-between mt-4">
                <button className="px-2 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600">Edit</button>
                <button className="px-3 py-1 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600">Done</button>
                <button className="px-3 py-1 text-sm bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">Up</button>
                <button className="px-3 py-1 text-sm bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">Down</button>
                <button className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600">Delete</button>
            </div>
        </div>
    )
}