import axios from "axios"

export const colors = {
  primary: "#3b82f6",
}

export const authService = axios.create({
  baseURL: `http://192.168.43.231:5000/api/auth`,
})
export const transactionService = axios.create({
  baseURL: `http://192.168.43.231:5000/api/transactions`
})

export const options = [
  "Lend",
  "Borrowed"
]