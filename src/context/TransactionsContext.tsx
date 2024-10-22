import { createContext, ReactNode, useEffect, useState } from "react";

interface Transaction{
    id: number;
    description: string;
    type: 'income' | 'outcome';
    price: number;
    category: string;
    createdAt: string;
}

interface TransactionContextType{
    transactions: Transaction[]
    fetchTransactions: (query?: string) => Promise<void>
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
        const url = new URL('http://localhost:3333/transactions')
        if(query){
            url.searchParams.append('q', query)
        }
        const response = await fetch(url)
        const data = await response.json(); 

        setTransactions(data);
       
    } catch (error){
        console.error('Error fetching transactions:', error);
        
    }
}

    // Fetch transactions when the component mounts and when the query changes.
    useEffect(()=>{
     fetchTransactions();
     
    },[])

    return(
        <TransactionsContext.Provider value={{
            transactions,
            fetchTransactions,
        }}>
            {children}
        </TransactionsContext.Provider>
    )
}