import { HeaderContainer, HeaderContext, NewTransactionsButton } from "./style";

import logoImg from '../../assets/logo.svg'
export function Header(){
    return(
        <HeaderContainer>
            <HeaderContext>
                <img src={logoImg} alt="" />

                <NewTransactionsButton>Nova transação</NewTransactionsButton>
            </HeaderContext>
        </HeaderContainer>
    )
}