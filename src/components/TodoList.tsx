import type { Todo } from "../types/Todo"
import TodoItem from "./TodoItem"
import { AnimatePresence, motion } from "framer-motion"

interface Props {
  todos: Todo[]
  onToggle: (id: number) => void
  onDelete: (id: number) => void
  onUpdate: (id: number, text: string) => void
}

export default function TodoList({ todos, onToggle, onDelete, onUpdate }: Props) {
  if (todos.length === 0) {
    return <p className="text-center text-slate-500 dark:text-slate-400">No tasks here 🚀</p>
  }

  return (
    <ul className="space-y-3">
      <AnimatePresence>
        {todos.map((t) => (
          <motion.li
            key={t.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
          >
            <TodoItem todo={t} onToggle={onToggle} onDelete={onDelete} onUpdate={onUpdate} />
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  )
}
