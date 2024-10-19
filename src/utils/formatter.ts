export const dateFormatter = new Intl.DateTimeFormat('pt-AO')

export const priceFormatter = new Intl.NumberFormat('pt-AO',{
    style: 'currency',
    currency: 'AOA',
})