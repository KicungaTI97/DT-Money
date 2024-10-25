
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";
import { PriceHightLight, TransactionsContainer, TransactionTable } from "./styles";
import { TransactionsContext } from "../../context/TransactionsContext";
import { dateFormatter, priceFormatter } from "../../utils/formatter";
import { useContextSelector } from "use-context-selector";


export function Transactions(){
    // Obtém a lista de transações do contexto
    const transactions = useContextSelector(TransactionsContext, (context) =>{
        return context.transactions
    })
    return(
        <div>
            <Header/>
            <Summary/>

        {/* Container para exibir a lista de transações e o formulário de busca */}
        <TransactionsContainer>

                {/* Formulário para buscar transações */}
            <SearchForm/>

            {/* Tabela com as transações */}
                <TransactionTable>

                    <tbody>
                        {/* Percorre a lista de transações e renderiza uma linha para cada uma */}
                        {transactions.map((transaction) =>{
                            return (
                                <tr key={transaction.id}>
                                <td width="50%">{transaction.description}</td>
                                <td>
                                    <PriceHightLight variant={transaction.type}>
                                        {/* Adiciona um sinal de "-" para transações de saída */}
                                        {transaction.type === 'outcome' && '- '}
                                    {priceFormatter.format(transaction.price)}
                                    </PriceHightLight>
                                </td>
                                <td>{transaction.category}</td>
                                <td>
                                    {dateFormatter.format(new Date(transaction.createdAt))}
                                </td>
                            </tr>
                            )
                        })}
                    </tbody>
                </TransactionTable>
            </TransactionsContainer>
        </div>
    )
}