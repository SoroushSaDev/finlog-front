import Link from "next/link";

export default function Home() {
    return (
        <div
            className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <h1 className="text-9xl max-sm:text-8xl max-sm:font-semibold bg-gradient-to-br from-blue-600 via-green-500 to-indigo-600 inline-block text-transparent bg-clip-text">
                    FinLog
                </h1>
                <p className="text-center w-full">
                    Your smart finance tracker
                </p>
            </main>
            <footer
                className="row-start-3 max-sm:font-bold flex max-sm:flex-col max-sm:space-y-3 sm:space-x-5 items-center justify-center max-sm:w-full rounded-lg py-3 px-4 sm:px-6 backdrop-blur-3xl bg-white/30 dark:bg-black/30 shadow-2xl">
                <Link href="login" className="hover:text-blue-500">
                    Login
                </Link>
                <hr className="sm:hidden border-gray-300 dark:border-gray-800 border-1 w-full"/>
                <Link href="register"
                      className="hover:text-blue-500 sm:border-s-2 sm:ps-5 border-gray-200 dark:border-gray-800">
                    Register
                </Link>
            </footer>
        </div>
    );
}
