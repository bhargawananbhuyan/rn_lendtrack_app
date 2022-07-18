import axios from "axios"

export const colors = {
  primary: "#3b82f6",
}

export const authService = axios.create({
  baseURL: "http://192.168.19.129:5000/api/auth",
})

export const options = [
  "Lend",
  "Borrowed"
]