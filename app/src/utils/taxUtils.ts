export const calculateTaxes = (transactions: object[]) => {
    let lend = 0, borrowed = 0
    transactions.forEach((transaction: any) => {
        if (transaction.transactionType === 0)
            lend += transaction.amount
         else 
            borrowed += transaction.amount
    })

    return {lend, borrowed}
}