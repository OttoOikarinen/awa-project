// This file shows all the users columns inside ColumnWrapper, called in the (todos)/page.tsx 
import TodoWrapper from "./todos";
import { UpdateColumnButton, DeleteColumnButton, MoveColumnDownButton, MoveColumnUpButton  } from "../buttons";
import { fetchColumns } from "@/app/lib/data";
import { getUserFromCookie } from "@/app/lib/session";
import { getUser } from "@/app/lib/data";

export default async function ColumnWrapper() {
    // First get user.
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
    
    // Fetch columns for the user.
    const columns = await fetchColumns(user.id);
    return (
        <div>
            <div className="grid grid-cols-5 md:grid-cols-3 sm:grid-cols-1 rounded-lg gap-5">
                {/* Map the columns inside a grid. */ }
                {columns.map((column) => (
                    <Column
                        key={column.id}
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

    return (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md border border-gray-300">
            {/* Column name */}
            <h2 className="text-lg font-semibold text-gray-800">{name}</h2>

            {/* Buttons inside a container */}
            <div className="flex space-x-2">
                <MoveColumnUpButton id={id}/>
                <MoveColumnDownButton id={id}/>
                <UpdateColumnButton id={id}/>
                <DeleteColumnButton id={id}/>
            </div>
        <TodoWrapper column_id={id}/>
    </div>
    )
}