import { motion } from "framer-motion"

export default function Landing() {
  return (
    <motion.div
      className="max-w-3xl text-center"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-5xl sm:text-6xl font-extrabold text-slate-800 leading-tight">
        Organize Your Day with <span className="text-indigo-600">TaskFlow</span>
      </h1>
      <p className="mt-6 text-lg text-slate-600">
        A modern, distraction-free todo app to manage tasks, track progress, and
        stay productive. Simple design, professional features, and a seamless
        experience across devices.
      </p>
    </motion.div>
  )
}
