import { useState } from "react"
import { login } from "../services/auth"
import { setToken } from "../routes/auth"
import { useNavigate, Link } from "react-router-dom"
import HeroBg from "../assets/bg-login.jpg"
import { showError, showSuccess } from "../components/Toast"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await login(email, password)
      setToken(res.token)
      showSuccess("Login berhasil")
      navigate("/")
    } catch (err: any) {
      showError(err.response?.data?.error || "Login gagal")
    }
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-10">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md flex flex-col gap-6"
        >
          <div>
            <h2 className="text-2xl font-bold">Login</h2>
            <p className="text-slate-500 text-sm mt-1">
              Welcome back, please login to your account
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-left">
              Email
            </label>
            <input
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              id="email"
              placeholder="Input your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-left">
              Password
            </label>
            <input
              type="password"
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              id="password"
              placeholder="Input your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex justify-between text-sm">
            <p>
              Not registered?
              <Link to="/register" className="text-cyan-500 ml-1">
                Sign up
              </Link>
            </p>
          </div>

          <button
            type="submit"
            className="bg-cyan-500 text-white rounded py-2 hover:bg-cyan-600 transition cursor-pointer"
          >
            Login
          </button>
        </form>
      </div>

      <div
        className="hidden lg:flex w-1/2 min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${HeroBg})` }}
      />
    </div>
  )
}
