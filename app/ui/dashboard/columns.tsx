// Tähän pitää importtaa joku sql kutsu, joka sitten hakee kolumnit tälle käyttäjälle. 
import TodoWrapper from "./todos";
import { UpdateColumnButton, DeleteColumnButton  } from "../buttons";
import { fetchColumns } from "@/app/lib/data";
import { getUserFromCookie } from "@/app/lib/session";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getUser } from "@/app/lib/data";

export default async function ColumnWrapper() {
    const email = await getUserFromCookie();
      if (email == null) {
        return (
            <div>
                Couldn't find user.
            </div>
        )
      }
      const user = await getUser(email)
      if (!user) {
        return (
            <div>
                Couldn't find user.
            </div>
        )
      }
    const columns = await fetchColumns(user.id);
    return (
        <div>
            
            

            <div className="grid grid-cols-5 md:grid-cols-3 sm:grid-cols-1 rounded-lg gap-5">
                {/* Map-funktio columnien listaamiseen. */ }
                {columns.map((column) => (
                    <Column
                        key={column.id} // Unique key for each column
                        id={column.id}
                        name={column.column_name}
                    />
                ))}
            </div>
        </div>
    );
};

export function Column({
    id,
    name,
}: {
    id: string;
    name: string;
}) {
    // Search for all of the todos inside this column.

    return (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md border border-gray-300">
            {/* Column Title */}
            <h2 className="text-lg font-semibold text-gray-800">{name}</h2>

            {/* Buttons Container */}
            <div className="flex space-x-2">
                {/*<MoveColumnUpButton id={id}/>
                <MoveColumnDownButton id={id}/>*/}
                <UpdateColumnButton id={id}/>
                <DeleteColumnButton id={id}/>
            </div>
        <TodoWrapper column_id={id}/>
    </div>
    )
}