import { useContext } from "react";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";
import { PriceHightLigth, TransactionsContainer, TransactionTable } from "./styles";
import { TransactionsContext } from "../../context/TransactionsContext";


export function Transactions(){
    const {transactions} = useContext(TransactionsContext)
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