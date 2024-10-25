import * as Dialog from "@radix-ui/react-dialog"; // Importa componentes do Radix para criar o modal
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from "./style";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import * as z from 'zod'
import { Controller, useForm } from "react-hook-form"; // Importa ferramentas para gerenciar formulários
import { zodResolver } from "@hookform/resolvers/zod"; // Conecta zod com react-hook-form
import { useContext } from "react";
import { TransactionsContext } from "../../context/TransactionsContext";

// Define o esquema de validação para o formulário usando zod
const newTransactionFormSchema = z.object({
    description: z.string(),
    price: z.number(),
    category: z.string(),
    type: z.enum(['income', 'outcome']),
})

// Define o tipo dos inputs do formulário com base no esquema
type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>;
export function NewTransactionModal(){
    // Usa o contexto para acessar a função de criar nova transação
    const {createTransaction} = useContext(TransactionsContext)

    // Utiliza react-hook-form para lidar com o formulário e validar os dados
    const {
        control,
        register, 
        handleSubmit, 
        formState: {isSubmitting},// Para saber se o formulário está sendo enviado
        reset,
    } = useForm<NewTransactionFormInputs>({
        resolver: zodResolver(newTransactionFormSchema),
        defaultValues:{
            type: 'income',
        }
    })

    // Função para criação de nova transação. Ao enviar o formulário, cria a transação no contexto e reseta o formulário.
    async function handleCreateNewTransaction(data: NewTransactionFormInputs){
        const {category, description,price,type} = data
        
        // Adiciona a transação ao contexto e reseta o formulário
        await createTransaction({
            description,
            price,
            category,
            type,
        })

        reset()
    }
    return(
        <Dialog.Portal> {/* Cria o portal do modal */}
            <Overlay/> {/* Fundo transparente que cobre a tela */}
            <Content> {/* Área principal do modal */}

                <Dialog.Title>Nova transação</Dialog.Title>

                    <CloseButton >
                        <X size={24}/>
                    </CloseButton>

                     {/* Formulário para criar nova transação */}
                    <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
                        <input 
                            type="text" 
                            placeholder="Descrição" 
                            required
                            {...register('description')} 
                        />
                        <input 
                            type="number" 
                            placeholder="Preço" 
                            required
                            {...register('price', {valueAsNumber: true})} 
                        />
                        <input 
                            type="text" 
                            placeholder="Categoria" 
                            required
                            {...register('category')} 
                        />

                        {/* Controlador para escolher entre entrada e saída */}
                       <Controller 
                        control={control}
                        name="type"
                        render={({field}) =>{
                            return(
                                <TransactionType onValueChange={field.onChange} value={field.value}>
                                    <TransactionTypeButton variant="income" value="income">
                                        <ArrowCircleUp size={24}/>
                                        Entrada
                                    </TransactionTypeButton>

                                    <TransactionTypeButton variant="outcome"value="outcome">
                                        <ArrowCircleDown size={24}/>
                                        Saída
                                    </TransactionTypeButton>
                                </TransactionType>
                            )
                        }}
                       />

                        <button type="submit" disabled={isSubmitting}>
                            Cadastrar
                        </button>
                    </form>
            </Content>
        </Dialog.Portal>
    )
}