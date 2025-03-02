// I have used Next.js nextjs-dasboard tutorial as a base for this file. 
// I've used https://nextjs.org/docs/app/building-your-application/authentication as a source. 

'use client'
import { Button } from "./buttons"

import {
    UserIcon,
    AtSymbolIcon,
    KeyIcon,
  } from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { registerUser } from '@/app/lib/actions'
import { useActionState } from "react";

export default function RegisterForm() {
  const [state, action, isPending] = useActionState(registerUser, undefined)

    return (
      <div>
        <form action={action} className="space-y-3">
          <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
            <h1 className="mb-3 text-2xl">
              Fill the information to register.
            </h1>
            <div className="w-full">
                <div>
                    <label
                      className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                      htmlFor="name"
                    >
                      Name
                    </label>
                    <div className="relative">
                      <input
                        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Enter your full name"
                        required
                      />
                      <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                    </div>
                  </div>
                  {state?.errors?.name && <p>{state.errors.name}</p>}
                <div>
                  <label
                    className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <input
                      className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Enter your email address"
                      required
                    />
                    <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                  </div>
                </div>
                {state?.errors?.email && <p>{state.errors.email}</p>}
                <div className="mt-4">
                  <label
                    className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                      id="password"
                      type="password"
                      name="password"
                      placeholder="Enter password"
                      required
                      minLength={6}
                    />
                    <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                  </div>
                </div>
            </div>
            <input type="hidden" name="redirectTo" value="/login" />
            
            <Button className="mt-4 w-full" aria-disabled={isPending}>
              Register <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
            </Button>
          </div>
        </form>
        <div
              className="flex h-12 items-end space-x-1 text-red-600 mt-10 ml-6"
              aria-live="polite"
              aria-atomic="true"
            >
              {state?.errors?.password && (
                <div>
                  <p>Password must:</p>
                    <ul>
                      {state.errors.password.map((error) => (
                      <li key={error}>- {error}</li>
                      ))}
                    </ul>
                </div>
              )}
            </div>
      </div>
)}