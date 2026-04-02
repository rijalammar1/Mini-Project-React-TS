import { useLocation } from "react-router-dom"

interface Props {
  setOpen: (val: boolean) => void
}

export default function Navbar({ setOpen }: Props) {
  const location = useLocation()

  const getTitle = () => {
    const path = location.pathname

    switch (true) {
      case path === "/":
        return "Dashboard"
      case path === "/list-user":
        return "List User"
      case path.startsWith("/users/"):
        return "Detail User"
      default:
        return "Page"
    }
  }

  return (
    <div className="bg-[#111827] border-b border-slate-700 px-4 py-3 flex items-center justify-between">
      <button
        className="lg:hidden text-cyan-400 text-xl"
        onClick={() => setOpen(true)}
      >
        ☰
      </button>

      <h1 className="font-semibold">{getTitle()}</h1>
    </div>
  )
}
