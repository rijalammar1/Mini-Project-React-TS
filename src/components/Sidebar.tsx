import { removeToken } from "../routes/auth"
import { Link, useNavigate } from "react-router-dom"

interface Props {
  open: boolean
  setOpen: (val: boolean) => void
}

export default function Sidebar({ open, setOpen }: Props) {
  const navigate = useNavigate()

  const handleLogout = () => {
    removeToken()
    navigate("/login")
  }

  return (
    <>
      <div
        className={`fixed z-20 top-0 left-0 h-screen w-full lg:w-64 flex flex-col justify-between 
        bg-cyan-600 text-white p-6 transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 lg:static`}
      >
        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Mini Project</h2>

            <button
              className="lg:hidden text-white text-2xl"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>
          </div>

          <nav className="flex flex-col gap-4 mt-7">
            <Link to="/" className="hover:bg-cyan-500 p-3 rounded">
              Dashboard
            </Link>
            <Link to="/list-user" className="hover:bg-cyan-500 p-3 rounded">
              List User
            </Link>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="bg-white text-cyan-600 px-4 py-2 rounded hover:bg-slate-100 cursor-pointer"
        >
          Logout
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-10 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  )
}
