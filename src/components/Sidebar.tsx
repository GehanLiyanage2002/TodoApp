import { Link, useLocation } from "react-router-dom"
import { FiHome, FiList } from "react-icons/fi"
import { motion } from "framer-motion"

export default function Sidebar() {
  const { pathname } = useLocation()
  const menu = [
    { name: "Home", icon: <FiHome />, path: "/" },
    { name: "Todos", icon: <FiList />, path: "/todos" },
  ]

  return (
    <motion.div
      className="bg-white shadow-lg w-64 h-screen fixed top-0 left-0 hidden sm:flex flex-col p-6 gap-6"
      initial={{ x: -200 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-indigo-600 mb-6">TaskFlow</h2>
      {menu.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-indigo-50 transition ${
            pathname === item.path ? "bg-indigo-100 font-medium text-indigo-700" : "text-slate-700"
          }`}
        >
          <span className="text-xl">{item.icon}</span>
          {item.name}
        </Link>
      ))}
    </motion.div>
  )
}
