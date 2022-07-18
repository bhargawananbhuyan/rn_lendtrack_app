import axios from "axios"

export const colors = {
  primary: "#3b82f6",
}

const ip = '192.168.19.129'

export const authService = axios.create({
  baseURL: `http://${ip}:5000/api/auth`,
})
export const transactionService = axios.create({
  baseURL: `http://${ip}:5000/api/transactions`
})

export const options = [
  "Lend",
  "Borrowed"
]