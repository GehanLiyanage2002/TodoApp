import { useState } from "react";
import type { Todo } from "../types/Todo";
import { motion } from "framer-motion";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";

interface Props {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onUpdate: (id: number, text: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete, onUpdate }: Props) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(todo.text);

  const handleSave = () => {
    if (!text.trim()) onDelete(todo.id);
    else onUpdate(todo.id, text.trim());
    setEditing(false);
  };

  return (
    <motion.div
      className="flex items-center justify-between bg-white dark:bg-slate-700 shadow-sm hover:shadow-md rounded-xl p-3 border border-slate-200 dark:border-slate-600 transition"
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center gap-3 flex-1">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="w-5 h-5 rounded cursor-pointer"
        />
        {editing ? (
          <input
            autoFocus
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={handleSave}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
              if (e.key === "Escape") setEditing(false);
            }}
            className="flex-1 px-2 py-1 rounded border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
        ) : (
          <span
            onDoubleClick={() => setEditing(true)}
            className={`flex-1 cursor-pointer ${todo.completed ? "line-through text-slate-400" : "text-slate-700"}`}
          >
            {todo.text}
          </span>
        )}
      </div>

      <div className="flex gap-3 ml-3">
        <motion.button onClick={() => setEditing(true)} whileHover={{ scale: 1.2 }}>
          <PencilIcon className="w-5 h-5 text-blue-500" />
        </motion.button>
        <motion.button onClick={() => onDelete(todo.id)} whileHover={{ scale: 1.2 }}>
          <TrashIcon className="w-5 h-5 text-red-500" />
        </motion.button>
      </div>
    </motion.div>
  );
}
