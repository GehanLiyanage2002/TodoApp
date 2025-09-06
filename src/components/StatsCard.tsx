import { motion } from "framer-motion"
import type { JSX } from "react/jsx-runtime"

interface Props {
  title: string
  value: number
  icon?: JSX.Element
}

export default function StatsCard({ title, value, icon }: Props) {
  return (
    <motion.div
      className="flex items-center gap-4 p-4 bg-white shadow-md rounded-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {icon && <div className="text-indigo-600 text-3xl">{icon}</div>}
      <div>
        <p className="text-slate-500 text-sm">{title}</p>
        <p className="text-2xl font-bold text-slate-800">{value}</p>
      </div>
    </motion.div>
  )
}
