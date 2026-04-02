import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import { getDetailUser } from "../services/auth"

export default function DetailUser() {
  const { id } = useParams()
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const fetchDetail = async () => {
    try {
      setLoading(true)
      const res = await getDetailUser(Number(id))
      setUser(res.data)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDetail()
  }, [id])

  return (
    <div className="flex min-h-screen bg-[#0f172a] text-white">
      <Sidebar open={open} setOpen={setOpen} />

      <div className="flex-1 flex flex-col">
        <Navbar setOpen={setOpen} />

        <div className="p-6 flex justify-center">
          {/* LOADING */}
          {loading ? (
            <div className="bg-[#111827] p-6 rounded-xl border border-slate-700 w-full max-w-md animate-pulse">
              <div className="w-24 h-24 rounded-full bg-slate-700 mx-auto mb-4" />
              <div className="h-5 bg-slate-700 rounded w-1/2 mx-auto mb-2" />
              <div className="h-4 bg-slate-700 rounded w-2/3 mx-auto" />
            </div>
          ) : (
            <div className="bg-[#111827] p-6 rounded-xl border border-slate-700 w-full max-w-md text-center">
              <img
                src={`https://images.weserv.nl/?url=${encodeURIComponent(user.avatar)}`}
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />

              <p className="text-xl font-semibold">
                First Name: {user.first_name}
              </p>
              <p className="text-xl font-semibold">
                Last Name: {user.last_name}
              </p>

              <p className="text-xl font-semibold">Email: {user.email}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
