export type User = {
    id: string,
    name: string,
    email: string,
    password: string
}

export type Column = {
    id: string,
    user_id: string,
    column_name: string,
    column_index: number,
}

export type Todo = {
    id: string,
    user_id: string,
    column_id: string,
    task: string,
    todo_index: number,
    done: boolean
}

export type ColumnField = {
    id: string,
    title: string
}