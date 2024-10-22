import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./style";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from 'zod';
import { useContext } from "react";
import { TransactionsContext } from "../../../../context/TransactionsContext";

const searchFormSchema = z.object({
    query: z.string()
})

type SearchFormInputs = z.infer<typeof searchFormSchema>;
export function SearchForm(){
    // Use context to fetch transactions.
    const {fetchTransactions} = useContext(TransactionsContext)
    console.log(fetchTransactions)
    // Implement form with react-hook-form and zod for validation.
    const {register, handleSubmit, formState: {isSubmitting}} = useForm<SearchFormInputs>({
        resolver: zodResolver(searchFormSchema)
    })

    // Implement the logic to search for transactions.
    async function handleSearchTransactions(data: SearchFormInputs){
        await fetchTransactions(data.query)
        
    }
    return(
        <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
            <input
             type="text" 
             placeholder="Buscar por transações..." 
             {...register('query')}
            />

            <button type="submit" disabled={isSubmitting}>
                <MagnifyingGlass size={20}/>
                Buscar
            </button>
        </SearchFormContainer>
    )
}