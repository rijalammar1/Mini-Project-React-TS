// cek apakah sudah login atau belum
export const getToken = () => {
  return localStorage.getItem("token")
}

// set token (login)
export const setToken = (token: string) => {
  localStorage.setItem("token", token)
}

// untuk logout
export const removeToken = () => {
  localStorage.removeItem("token")
}

// cek apakah sudah login atau belum dalam bentuk fungsi
export const isAuthenticated = () => {
  return !!getToken()
}
