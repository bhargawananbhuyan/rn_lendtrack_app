import axios from "axios"

export const colors = {
  primary: "#3b82f6",
}

export const authService = axios.create({
  baseURL: "http://192.168.43.18:5000/api/auth",
})
