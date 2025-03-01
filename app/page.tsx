// Home page. This UI layout has been copied from Tailwind CSS components and modified for this purpose.

import Link from "next/link";
import { fetchUserAmount, fetchTodoAmount } from "./lib/data";

export default async  function Home() {
  const amoutOfUsers = await fetchUserAmount()
  const amountOfTodos = await fetchTodoAmount()

  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex flex-1">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Todo app</span>
              <img
                alt="Todo logo"
                src="/todo-logo.png"
                className="h-8 w-auto"
              />
            </a>
          </div>
          <div className="flex flex-1 justify-end gap-5">
            <Link
              href="/register"
              className="px-4 py-2 border border-gray-500 text-gray-900 rounded-lg hover:bg-gray-100 transition"
              >
              Register
            </Link>
            <Link
              href="/login"
              className="px-4 py-2 border border-gray-500 text-gray-900 rounded-lg hover:bg-gray-100 transition"
              >
              Login
            </Link>
          </div>
        </nav>
      </header>

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
              App to handle all of your tasks.
            </h1>
            <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
              Order your tasks in kanban style boards to maximize your efficiency. {amoutOfUsers} users already use this app to handle their {amountOfTodos} todos.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}