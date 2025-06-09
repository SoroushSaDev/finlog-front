"use client";

import Link from "next/link";
import {useRouter} from "next/navigation";
import { useState } from "react";
import axios from "axios";
import {ArrowRightCircleIcon} from "@heroicons/react/24/solid";

export default function Register() {
    const router = useRouter();
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const register = async () => {
        await axios.post(`${baseUrl}/api/register`, {name: username, password: password}).then((response) => {
            if (response.status === 200) {
                localStorage.setItem("token", response.data.accessToken);
                localStorage.setItem("user", JSON.stringify(response.data.user));
                router.push("/dashboard");
            } else {
                console.log(response);
            }
        })
    }
      
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
                                <form action=""
                      className="px-4 py-3 w-full flex flex-col items-center justify-center space-y-3 rounded-lg bg-white/30 dark:bg-black/30 shadow-2xl">
                    <div className="grid gap-6 mb-6 md:grid-cols-2 max-sm:w-full">
                        <div className="w-full">
                            <label htmlFor="username"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Username
                            </label>
                            <input type="text" id="username" value={username}
                                   onChange={(e) => setUsername(e.target.value)}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="JohnDoe" required/>
                        </div>
                        <div className="w-full">
                            <label htmlFor="password"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Password
                            </label>
                            <input type="password" id="password" value={password}
                                   onChange={(e) => setPassword(e.target.value)}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="" required/>
                        </div>
                    </div>
                    <button type="button" onClick={register}
                            className="flex items-center rounded-full ps-4 pe-1 bg-gradient-to-r from-blue-600 via-green-500
                        to-indigo-400 text-white hover:cursor-pointer hover:shadow-2xl">
                        <span className="py-1">
                            Register
                        </span>
                        <ArrowRightCircleIcon width={25} height={25} className="ms-1 shadow-2xl"/>
                    </button>
                </form>
            </main>
            <footer
                className="row-start-3 flex max-sm:flex-col max-sm:space-y-3 sm:space-x-5 items-center justify-center max-sm:w-full rounded-lg py-3 px-4 sm:px-6 backdrop-blur-3xl bg-white/30 dark:bg-black/30 shadow-2xl">
                <p>
                    Already have an account ?
                </p>
                <hr className="sm:hidden border-gray-300 dark:border-gray-800 border-1 w-full"/>
                <Link href="/login"
                      className="hover:text-blue-500 max-sm:font-bold sm:border-s-2 sm:ps-5 border-gray-200 dark:border-gray-800">
                    Login
                </Link>
            </footer>
        </div>
    )
}