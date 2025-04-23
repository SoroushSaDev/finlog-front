import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-9xl bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
          FinLog
        </h1>
      </main>
      <footer className="row-start-3 flex max-sm:flex-col max-sm:space-y-3 sm:space-x-5 items-center justify-center rounded-lg py-3 px-4 bg-gray-100 dark:bg-gray-900">
        <Link href="login" className="hover:text-blue-500">
          Login
        </Link>
        <hr className="sm:hidden text-gray-200 dark:text-gray-800 border-1 w-full"/>
        <Link href="register" className="hover:text-blue-500 sm:border-s-2 sm:ps-5 border-gray-200 dark:border-gray-800">
          Register
        </Link>
      </footer>
    </div>
  );
}
