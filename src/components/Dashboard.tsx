import type { Todo } from "./TodoApp"
import StatsCard from "./StatsCard"
import ProgressBar from "./ProgressBar"
import { FiCheckCircle, FiClock, FiClipboard } from "react-icons/fi"

interface Props {
  todos: Todo[]
}

export default function Dashboard({ todos }: Props) {
  const total = todos.length
  const completed = todos.filter((t) => t.completed).length
  const pending = total - completed
  const progress = total === 0 ? 0 : Math.round((completed / total) * 100)

  return (
    <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
      <StatsCard title="Total Tasks" value={total} icon={<FiClipboard />} />
      <StatsCard title="Completed" value={completed} icon={<FiCheckCircle />} />
      <StatsCard title="Pending" value={pending} icon={<FiClock />} />

      <div className="col-span-full">
        <p className="text-sm text-slate-600 mb-1">Progress</p>
        <ProgressBar progress={progress} />
      </div>
    </div>
  )
}
