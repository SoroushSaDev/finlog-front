import Link from "next/link";

export default function Register() {
    return (
        <div
            className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <h1 className="text-9xl max-sm:text-8xl bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
                    Register
                </h1>
                <p className="text-center w-full">
                    Create your <strong
                    className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
                    FinLog
                </strong> account
                </p>
            </main>
            <footer
                className="row-start-3 flex max-sm:flex-col max-sm:space-y-3 sm:space-x-5 items-center justify-center max-sm:w-full rounded-lg py-3 px-4 sm:px-6 bg-gray-100 dark:bg-gray-900">
                <p>
                    Already have an account ?
                </p>
                <hr className="sm:hidden text-gray-200 dark:text-gray-800 border-1 w-full"/>
                <Link href="/login"
                      className="hover:text-blue-500 sm:border-s-2 sm:ps-5 border-gray-200 dark:border-gray-800">
                    Login
                </Link>
            </footer>
        </div>
    )
}