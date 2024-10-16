import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { PriceHightLigth, TransactionsContainer, TransactionTable } from "./styles";

export function Transactions(){
    return(
        <div>
            <Header/>
            <Summary/>

        <TransactionsContainer>
                <TransactionTable>
                    <tbody>
                        <tr>
                            <td width="50%">Desenvolvimento de site</td>
                            <td>
                                <PriceHightLigth variant="income">
                                R$ 12.000,00
                                </PriceHightLigth>
                            </td>
                            <td>Venda</td>
                            <td>13/04/2022</td>
                        </tr>
                        <tr>
                            <td width="50%">Hamburger</td>
                            <td>
                                <PriceHightLigth variant="outcome">
                                - R$ 59,00
                                </PriceHightLigth>
                            </td>
                            <td>Alimentação</td>
                            <td>10/04/2022</td>
                        </tr>
                    </tbody>
                </TransactionTable>
            </TransactionsContainer>
        </div>
    )
}