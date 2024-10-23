import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../lib/axios";

interface Transaction{
    id: number;
    description: string;
    type: 'income' | 'outcome';
    price: number;
    category: string;
    createdAt: string;
}
interface CreateTransactionInput{
    description: string;
    price: number;
    category: string;
    type: 'income' | 'outcome';
}
interface TransactionContextType{
    transactions: Transaction[]
    fetchTransactions: (query?: string) => Promise<void>
    createTransaction: (data: CreateTransactionInput) => Promise<void>
}

export const TransactionsContext = createContext({} as TransactionContextType)

interface TransactionsProviderProps{
    children: ReactNode
}


// Implement the TransactionsProvider component to provide the transactions context and fetch transactions from the API.
export function TransactionsProvider({children}:TransactionsProviderProps){
    const [transactions, setTransactions] = useState<Transaction[]>([])
    // Implement the logic to fetch transactions from the API.
    async function fetchTransactions(query?: string){
   
        try {
            const response = await api.get('transactions',{
                params: {
                    q: query,
                    _sort: 'createdAt',
                    _order: 'desc',
                 
                },
            })
            setTransactions(response.data);
        } catch (error) {
            console.log('Error fetching transactions:',error,)
     }
}

    async function createTransaction(data: CreateTransactionInput){
        const {description, price, category, type} = data;

        const response = await api.post('transactions', {
            description,
            price,
            category,
            type,
            createdAt: new Date(),
        })

        setTransactions(state => [response.data, ...state])
    }

    // Fetch transactions when the component mounts and when the query changes.
    useEffect(()=>{
     fetchTransactions();
     
    },[])

    return(
        <TransactionsContext.Provider value={{
            transactions,
            fetchTransactions,
            createTransaction,
        }}>
            {children}
        </TransactionsContext.Provider>
    )
}