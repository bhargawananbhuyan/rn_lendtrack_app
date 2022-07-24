import React, { PropsWithChildren, useReducer } from "react"

export const UserContext = React.createContext(null)

let initialState = {
  loading: false,
  user: {},
  error: "",
}

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "GET_USER_REQUEST":
      return {
        ...state,
        loading: true,
      }

    case "GET_USER_SUCCESS":
      return {
        loading: false,
        user: action.payload,
        error: "",
      }

    case "GET_USER_ERROR":
      return {
        loading: false,
        user: {},
        error: action.payload,
      }

    case "UPDATE_USER":
      return {
        ...state,
        user: action.payload,
      }

    default:
      return state
  }
}

const UserProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState)

  return (
    <UserContext.Provider
      value={
        {
          user: state,
          getUserRequest: () => {
            dispatch({ type: "GET_USER_REQUEST" })
          },
          getUserSuccess: (payload: object) => {
            dispatch({ type: "GET_USER_SUCCESS", payload })
          },
          getUserError: (payload: object) => {
            dispatch({ type: "GET_USER_ERROR", payload })
          },
          updateUser: (payload: object) => {
            dispatch({ type: "UPDATE_USER", payload })
          },
        } as any
      }
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
