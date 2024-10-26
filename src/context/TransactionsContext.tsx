import { ReactNode, useEffect, useState, useCallback } from "react";
import { api } from "../lib/axios";
import { createContext } from "use-context-selector";

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
// Interface para definir o tipo do contexto, incluindo os métodos para buscar e criar transações
interface TransactionContextType{
    transactions: Transaction[];  // lista de transações
    fetchTransactions: (query?: string) => Promise<void>; // método para buscar transações
    createTransaction: (data: CreateTransactionInput) => Promise<void> // método para criar uma nova transação
}

// Criação do contexto `TransactionsContext` com um valor inicial vazio, mas do tipo `TransactionContextType`
export const TransactionsContext = createContext({} as TransactionContextType)

// Interface para definir as propriedades que o `TransactionsProvider` deve receber (neste caso, os filhos)
interface TransactionsProviderProps{
    children: ReactNode
}

// Função principal que fornece o contexto para os componentes que consomem dados de transações
export function TransactionsProvider({children}:TransactionsProviderProps){
     // State (estado) para armazenar a lista de transações
    const [transactions, setTransactions] = useState<Transaction[]>([])

    // Função para buscar transações do servidor. Pode aceitar uma query opcional para filtrar resultados
    const fetchTransactions = useCallback(
        async (query?: string) =>{
   
            try {
                 // Faz uma requisição GET para buscar transações e ordena os resultados por data (mais recentes primeiro)
                const response = await api.get('transactions',{
                    params: {
                        q: query, // Filtrar resultados por query se for fornecida
                        _sort: 'createdAt',
                        _order: 'desc',
                     
                    },
                })
                setTransactions(response.data); // Atualiza o estado com as transações obtidas
            } catch (error) {
                console.log('Error fetching transactions:',error,)
         }
    },[]
    
    )
// Função para criar uma nova transação e enviar para o servidor
    const createTransaction = useCallback(
        async (data: CreateTransactionInput) =>{
            const {description, price, category, type} = data;
    
            // Faz uma requisição POST para criar uma nova transação e adiciona-a à lista de transações
            const response = await api.post('transactions', {
                description,
                price,
                category,
                type,
                createdAt: new Date(), // Define a data de criação como o momento atual
            },[],
        )
    
             // Adiciona a nova transação ao estado (no início da lista)
            setTransactions(state => [response.data, ...state])
        }
    )

    // useEffect para buscar transações automaticamente quando o componente for montado
    useEffect(()=>{
     fetchTransactions(); // Chama a função para buscar transações quando o componente é carregado
     
    },[])
// Provedor do contexto que disponibiliza os dados e métodos para os componentes filhos
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