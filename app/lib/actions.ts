// All of the actions the buttons call will be here!
'use server';

export async function registerUser() {
    console.log("Registering user user.")
}

export async function authenticate() {
    console.log("Authenticating.")
}

export async function deleteUser() {
    console.log("Delete user.")
}

export async function createColumn() {
    console.log("Creating new column.")
}

export async function modifyColumn() {
    console.log("Modifying column.")
}

export async function deleteColumn(id: string) {
    console.log("Deleting column.")
}

export async function moveColumnUp() {
    console.log("Move column up.")
}

export async function moveColumnDown() {
    console.log("Move column down.")
}

export async function createTodo() {
    console.log("Create a new todo.")
}

export async function deleteTodo(id: string) {
    console.log("Delete todo.")
}

export async function modifyTodo() {
    console.log("Modify todo.")
}

export async function moveTodoUp() {
    console.log("Move todo up.")
}

export async function moveTodoDown() {
    console.log("Move todo down.")
}

export async function markTodoDone(id: string) {
    console.log("Mark todo done!")
}