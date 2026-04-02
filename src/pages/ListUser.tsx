import { useEffect, useState } from "react"
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import { listUser } from "../services/auth"
import { useNavigate } from "react-router-dom"

export default function ListUser() {
  const [open, setOpen] = useState(false)
  const [users, setUsers] = useState<any[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const navigate = useNavigate()

  const getUsers = async () => {
    try {
      const res = await listUser(page)
      setUsers(res.data)
      setTotalPages(res.total_pages)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getUsers()
  }, [page])

  return (
    <div className="flex min-h-screen bg-[#0f172a] text-white">
      <Sidebar open={open} setOpen={setOpen} />

      <div className="flex-1 flex flex-col">
        <Navbar setOpen={setOpen} />

        <div className="p-6">
          {/* LIST */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 cursor-pointer">
            {users.map((user) => (
              <div
                key={user.id}
                onClick={() => navigate(`/users/${user.id}`)}
                className="bg-[#111827] p-4 rounded-xl border border-slate-700 
                flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition"
              >
                <img
                  src={`https://images.weserv.nl/?url=${encodeURIComponent(user.avatar)}`}
                  alt={user.first_name}
                  className="w-16 h-16 rounded-full mb-3"
                />
                <h3 className="font-semibold">
                  {user.first_name} {user.last_name}
                </h3>
              </div>
            ))}
          </div>

          {/* PAGINATION */}
          <div className="flex justify-center items-center gap-2 mt-8">
            {/* PREV */}
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="px-3 py-1 bg-slate-700 rounded disabled:opacity-50"
            >
              Prev
            </button>

            {/* NUMBER */}
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  page === i + 1
                    ? "bg-cyan-500"
                    : "bg-slate-700 hover:bg-slate-600"
                }`}
              >
                {i + 1}
              </button>
            ))}

            {/* NEXT */}
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
              className="px-3 py-1 bg-slate-700 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
