"use client";

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import {Account, Transaction, User} from "@/src/types/main";
import {ArrowDownCircleIcon, Bars3Icon, UserCircleIcon} from "@heroicons/react/24/solid";
import Link from "next/link";

export default function Dashboard() {
    const token = localStorage.getItem("token");
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const user: User = JSON.parse(localStorage.getItem("user") ?? '');

    const router = useRouter();

    const [balance, setBalance] = useState<number>(0);
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [activeAccount, setActiveAccount] = useState<Account>();
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    const fetchAccounts = async () => {
        try {
            await axios.get(`${baseUrl}/api/accounts`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((response) => {
                if (response.status === 200) {
                    setAccounts(response.data);
                }
            })
        } catch (err) {
            if (err.status === 403) {
                router.push("/");
            }
        }
    }

    const fetchTransactions = async () => {
        try {
            await axios.get(`${baseUrl}/api/accounts/${activeAccount?._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((response) => {
                if (response.status === 200) {
                    setTransactions(response.data);
                }
            })
        } catch (err) {
            if (err.status === 403) {
                router.push("/");
            }
        }
    }

    const fetchBalance = async () => {
        try {
            await axios.get(`${baseUrl}/api/accounts/${activeAccount?._id}/balance`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((response) => {
                if (response.status === 200) {
                    setBalance(response.data.balance);
                }
            })
        } catch (err) {
            if (err.status === 403) {
                router.push("/");
            }
        }
    }

    useEffect(() => {
        if (!token) {
            router.push("/");
        } else {
            fetchAccounts();
        }
    }, [])

    useEffect(() => {
        setActiveAccount(accounts[0]);
    }, [accounts]);

    useEffect(() => {
        if (activeAccount) {
            fetchBalance();
            fetchTransactions();
        }
    }, [activeAccount]);
    return (
        <>
            <div className="fixed top-3 px-3 w-full flex items-center justify-between backdrop-blur-3xl">
                <button type="button"
                        className="sm:invisible p-1 rounded-full bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 text-white">
                    <Bars3Icon width={25} height={25} className="shadow-2xl"/>
                </button>
                <div className="flex items-center rounded-full ps-4 pe-1 py-1 bg-gradient-to-r from-blue-600 via-green-500
                        to-indigo-400 text-white hover:cursor-pointer hover:shadow-2xl">
                    <span>
                        {activeAccount?.title}
                    </span>
                    <ArrowDownCircleIcon width={25} height={25} className="ms-2 shadow-2xl"/>
                </div>
                <Link href="/"
                      className="flex items-center rounded-full px-1 sm:pe-4 py-1 bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 text-white hover:cursor-pointer hover:shadow-2xl">
                    <UserCircleIcon width={25} height={25} className="shadow-2xl"/>
                    <span className="ms-2 max-sm:hidden">
                        {user.name}
                    </span>
                </Link>
            </div>
            <div className="mt-20 text-center px-3">
                <h1 className="text-5xl">
                    {balance}
                </h1>
                <h2 className="text-lg mt-2">
                    Balance
                </h2>
                <div
                    className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 text-white rounded-lg mt-5 p-3">
                    <h3 className="text-xl">
                        Latest Transactions
                    </h3>
                    <hr className="my-3"/>
                    <ol className="space-y-2">
                        {transactions?.map((transaction: Transaction, index) => (
                            <div key={index} className="flex justify-between items-center">
                            <span>
                                {transaction.title}
                            </span>
                                <span>
                                {`${transaction.type === 'income' ? '+' : '-'} ${transaction.amount}`}
                            </span>
                            </div>
                        ))}
                    </ol>
                </div>
            </div>
        </>
    )
}