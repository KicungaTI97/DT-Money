import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";
import { PriceHightLigth, TransactionsContainer, TransactionTable } from "./styles";


interface Transaction{
    id: number;
    description: string;
    type: 'income' | 'outcome';
    price: number;
    category: string;
    createdAt: string;
}
export function Transactions(){
    const [transactions, setTransactions] = useState<Transaction[]>([])

    async function loadTransaction(){
        const response = await fetch('http://localhost:3333/transactions')
        const data = await response.json(); 

        setTransactions(data);
    }

    useEffect(()=>{
     loadTransaction();
    },[])
    return(
        <div>
            <Header/>
            <Summary/>

        <TransactionsContainer>
            <SearchForm/>
                <TransactionTable>
                    <tbody>
                        {transactions.map((transaction) =>{
                            return (
                                <tr key={transaction.id}>
                                <td width="50%">{transaction.description}</td>
                                <td>
                                    <PriceHightLigth variant={transaction.type}>
                                    {transaction.price}
                                    </PriceHightLigth>
                                </td>
                                <td>{transaction.category}</td>
                                <td>{transaction.createdAt}</td>
                            </tr>
                            )
                        })}
                    </tbody>
                </TransactionTable>
            </TransactionsContainer>
        </div>
    )
}