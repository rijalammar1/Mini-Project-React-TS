import { useState } from "react"
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"

export default function Dashboard() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-[#0f172a] text-white">
      <Sidebar open={open} setOpen={setOpen} />

      <div className="flex-1 flex flex-col">
        <Navbar setOpen={setOpen} />

        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">Welcome to Dashboard</h2>
          <p className="text-slate-400">Ini adalah mini project saya</p>
        </div>
      </div>
    </div>
  )
}
