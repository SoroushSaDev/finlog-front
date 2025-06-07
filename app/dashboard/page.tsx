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
    const [showAccounts, setShowAccounts] = useState<boolean>(false);
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
        setActiveAccount(accounts ? accounts[0] : undefined);
        console.log(accounts);
    }, [accounts]);

    useEffect(() => {
        if (activeAccount) {
            fetchBalance();
            fetchTransactions();
        }
    }, [activeAccount]);
    return (
        <>
            <div className="fixed top-3 px-3 w-full grid grid-cols-10 gap-6 items-center backdrop-blur-3xl">
                <div className="flex items-center justify-start space-x-2">
                    <button type="button" title="menu"
                        className="w-min sm:invisible p-1 rounded-full bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 text-white">
                        <Bars3Icon width={25} height={25} className="shadow-2xl"/>
                    </button>
                </div>
                <div className="flex items-center justify-center space-x-2 w-full col-span-8">
                    <button type="button"
                            className="flex items-center rounded-full ps-4 pe-1 py-1 bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 text-white hover:cursor-pointer hover:shadow-2xl"
                            onClick={() => setShowAccounts(true)}>
                        <span className="font-semibold">
                            {activeAccount?.title}
                        </span>
                        <ArrowDownCircleIcon width={25} height={25} className="ms-2 shadow-2xl"/>
                    </button>
                </div>
                <div className="flex items-center justify-end space-x-2">
                    <Link href="/"
                          className="w-min flex items-center justify-end rounded-full px-1 sm:pe-4 py-1 bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 text-white hover:cursor-pointer hover:shadow-2xl">
                        <UserCircleIcon width={25} height={25} className="shadow-2xl"/>
                        <span className="ms-2 max-sm:hidden font-semibold">
                            {user.name}
                        </span>
                    </Link>
                </div>
            </div>
            <div className="mt-20 text-center px-3">
                <h1 className="text-5xl font-semibold">
                    {balance}
                </h1>
                <h2 className="text-md mt-2 font-bold">
                    Balance
                </h2>
                <div
                    className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 text-white rounded-lg mt-5 p-3">
                    <h3 className="text-xl font-semibold">
                        Latest Transactions
                    </h3>
                    <hr className="my-3"/>
                    <ol className="space-y-2">
                        {transactions.length > 0 ? transactions?.map((transaction: Transaction, index) => (
                            <li key={index} className="flex justify-between items-center">
                                <span>
                                    {transaction.title}
                                </span>
                                <span className="font-bold">
                                    {`${transaction.type === 'income' ? '+' : '-'} ${transaction.amount}`}
                                </span>
                            </li>
                        )) : (<li>No transactions</li>)}
                    </ol>
                </div>
            </div>

            <div className={`${showAccounts ? 'fixed' : 'hidden'} top-0 p-2 w-full`}>
                <div className="backdrop-blur-3xl rounded-xl p-3 w-full shadow-2xl">
                    <p className="text-center text-3xl font-bold">
                        Accounts
                    </p>
                    <ol className="mt-5">
                        {accounts.map((account, key) => (
                            <li key={key} className="flex justify-between items-center font-semibold">
                                <label htmlFor={`account-${key}`}>
                                    {account.title}
                                </label>
                                <input type="radio" id={`account-${key}`} name="active" checked={activeAccount?._id == account._id}
                                    onChange={() => {setActiveAccount(account); setShowAccounts(false)}}/>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </>
    )
}