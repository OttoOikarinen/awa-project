import { fetchColumns, fetchTodoAmountForUser, getUser } from '@/app/lib/data'
import { getUserFromCookie } from '@/app/lib/session'
import { deleteUser } from '@/app/lib/actions'
import { XMarkIcon } from '@heroicons/react/24/outline'

export default async function Example() {

    const email = await getUserFromCookie()
    const user = await getUser(email)

    if (!user) {
        return (
            <p>User not available.</p>
        )
    }

    const todoAmount = await fetchTodoAmountForUser(user.id)
    const columns = await fetchColumns(user.id)
    const columnAmount = columns.length

  return (
    <div>
      <div className="px-4 sm:px-0">
        <h3 className="text-base/7 font-semibold text-gray-900">Your Profile</h3>
        <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">Personal details.</p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Full name</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{user?.name}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Email address</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{user?.email}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Amount of todos</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{todoAmount}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Amount of columns</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{columnAmount}</dd>
          </div>
        </dl>
      </div>
      <form
        action={async () => {
          'use server';
          await deleteUser();
        }}>
          <button className="flex h-[48px] w-1/4 md:w-full items-center justify-center gap-2 rounded-md bg-red-300 p-3 text-sm font-medium hover:bg-red-500 hover:text-white md:flex-none md:justify-start md:p-2 md:px-3">
            <XMarkIcon className="w-6" />
            <div className="hidden md:block">Delete account</div>
          </button>
        </form>
    </div>
  )
}
