import React, { PropsWithChildren, useReducer } from "react"

export const TransactionsContext = React.createContext(null)

let initialState = {
  loading: false,
  data: [],
  error: "",
}

const transactionsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "GET_TRANSACTIONS_REQUEST":
      return {
        ...state,
        loading: true,
      }

    case "GET_TRANSACTIONS_SUCCESS":
      return {
        loading: false,
        data: action.payload,
        error: "",
      }

    case "GET_TRANSACTIONS_ERROR":
      return {
        loading: false,
        data: [],
        error: action.payload,
      }

    case "ADD_NEW_TRANSACTION":
      return {
        ...state,
        data: [action.payload, ...state.data],
      }

    default:
      return state
  }
}

const TransactionsProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(transactionsReducer, initialState)

  return (
    <TransactionsContext.Provider
      value={
        {
          transactions: state.data,
          getAllTransactions: (data: object[]) => {
            dispatch({ type: "GET_TRANSACTIONS_SUCCESS", payload: data })
          },
          addTransaction: (data: object) => {
            dispatch({ type: "ADD_NEW_TRANSACTION", payload: data })
          },
        } as any
      }
    >
      {children}
    </TransactionsContext.Provider>
  )
}

export default TransactionsProvider
