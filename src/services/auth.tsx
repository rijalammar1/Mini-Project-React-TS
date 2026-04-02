import axios from "axios"

const API = "https://reqres.in/api"
const API_KEY = import.meta.env.VITE_REQRES_API_KEY

export const login = async (email: string, password: string) => {
  const res = await axios.post(
    `${API}/login`,
    { email, password },
    {
      headers: {
        "x-api-key": API_KEY,
      },
    },
  )
  return res.data
}

export const register = async (email: string, password: string) => {
  const res = await axios.post(
    `${API}/register`,
    { email, password },
    {
      headers: {
        "x-api-key": API_KEY,
      },
    },
  )
  return res.data
}

export const listUser = async (page: number) => {
  const res = await axios.get(`${API}/users?page=${page}`, {
    headers: {
      "x-api-key": API_KEY,
    },
  })
  return res.data
}

export const getDetailUser = async (id: number) => {
  const res = await axios.get(`${API}/users/${id}`, {
    headers: {
      "x-api-key": API_KEY,
    },
  })
  return res.data
}
