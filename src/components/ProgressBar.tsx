import { motion } from "framer-motion"

interface Props {
  progress: number // 0-100
}

export default function ProgressBar({ progress }: Props) {
  return (
    <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden mt-2">
      <motion.div
        className="bg-indigo-600 h-3 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5 }}
      />
    </div>
  )
}
