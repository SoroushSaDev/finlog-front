import Link from "next/link";

export default function Login() {
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <h1 className="text-9xl">
                    Login
                </h1>
            </main>
            <footer className="row-start-3 flex max-sm:flex-col max-sm:space-y-3 sm:space-x-5 items-center justify-center rounded-lg py-3 px-4 bg-gray-100 dark:bg-gray-900">
                <Link href="/" className="hover:text-blue-500">
                    Home
                </Link>
            </footer>
        </div>
    )
}