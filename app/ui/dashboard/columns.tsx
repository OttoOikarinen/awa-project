// Tähän pitää importtaa joku sql kutsu, joka sitten hakee kolumnit tälle käyttäjälle. 

import TodoWrapper from "./todos";


export default async function ColumnWrapper() {
    // const columnList = getListOfColumns() etc...
    return (
        <div className="grid grid-cols-5 md:grid-cols-3 sm:grid-cols-1 rounded-lg gap-5">
            {/* Tähän tarvitaan map-funktio columnien listaamiseen. */ }
            <Column id="1" title="Prepare"/>
            <Column id="2" title="Work started"/>
            <Column id="3" title="Next up"/>
            <Column id="4" title="Delegate"/>
            <Column id="5" title="Needs resources"/>
            <Column id="6" title="Almost finished"/>
        </div>
    );
};

export function Column({
    id,
    title,
}: {
    id: string;
    title: string;
}) {
    // Search for all of the todos inside this column.

    return (
        <div className="bg-gray-200 rounded-lg justify-center">
            {/* Kolumnin otsikko */ }
            {/* Nappi kolumnin poistamiseen */ }
            {/* Napit kolumnin siirtämiseen */ }
            
            <h2 className="text-md font-semibold text-gray-800">{title}</h2>
            <TodoWrapper />
        </div>
    )
}