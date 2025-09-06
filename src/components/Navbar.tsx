import { useState } from "react"
import { FiMenu } from "react-icons/fi"
import { motion } from "framer-motion"
import Sidebar from "./Sidebar"

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <div className="sm:hidden bg-white shadow-md sticky top-0 z-50 flex items-center justify-between px-4 py-3">
      <h1 className="text-2xl font-bold text-indigo-600">TaskFlow</h1>
      <button onClick={() => setOpen(!open)}>
        <FiMenu className="text-2xl" />
      </button>

      {open && (
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          exit={{ x: -300 }}
          className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 p-6"
        >
          <Sidebar />
        </motion.div>
      )}
    </div>
  )
}
