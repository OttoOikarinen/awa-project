// I have used the nextjs-dashboard tutorial a source for the file, mainly because of the styling. There isn't any functionality. 

import RegisterForm from '@/app/ui/register-form';
import { Suspense } from 'react';
 
export default function RegisterPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <Suspense>
          <RegisterForm />
        </Suspense>
      </div>
    </main>
  );
}