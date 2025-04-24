export interface User {
    id: string;
    name: string;
    email: string;
}

export interface Account {
    _id: string,
    user: string,
    title: string,
    createdAt: Date,
    updatedAt: Date,
}

export interface Transaction {
    date: Date,
    _id: string,
    type: string,
    title: string,
    amount: number,
    account: string,
    createdAt: Date,
    updatedAt: Date,
    user: null | User,
}