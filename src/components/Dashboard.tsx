import type { Todo } from "../types/Todo";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

interface Props {
  todos: Todo[];
}

export default function Dashboard({ todos }: Props) {
  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;
  const active = total - completed;
  const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-4 shadow-md">
      <div className="text-center sm:text-left">
        <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-400">Total Tasks</h3>
        <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">{total}</p>
      </div>
      <div className="text-center sm:text-left">
        <h3 className="text-lg font-semibold text-green-600 dark:text-green-400">Completed</h3>
        <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">{completed}</p>
      </div>
      <div className="text-center sm:text-left">
        <h3 className="text-lg font-semibold text-red-600 dark:text-red-400">Active</h3>
        <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">{active}</p>
      </div>
      <div className="flex items-center gap-2">
        <CheckCircleIcon className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
        <div>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-200">Completion</p>
          <div className="w-40 bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
            <div
              className="bg-indigo-600 h-3 rounded-full transition-all"
              style={{ width: `${completionRate}%` }}
            ></div>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-200">{completionRate}%</p>
        </div>
      </div>
    </div>
  );
}
