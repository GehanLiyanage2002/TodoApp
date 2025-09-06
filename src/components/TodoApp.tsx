import { useEffect, useState } from "react"
import TodoInput from "./TodoInput"
import TodoList from "./TodoList"
import Dashboard from "./Dashboard"
import type { Todo } from "../types/Todo"
import { getTodos, addTodo, updateTodo, deleteTodo } from "../api/todoApi"




export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await getTodos();
        setTodos(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  const handleAdd = async (text: string) => {
    try {
      const newTodo = await addTodo(text);
      setTodos((prev) => [newTodo, ...prev]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggle = async (id: number) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;
    try {
      await updateTodo(id, { completed: !todo.completed });
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (id: number, text: string) => {
    try {
      await updateTodo(id, { text });
      setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, text } : t)));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleClearCompleted = async () => {
    const completedTodos = todos.filter((t) => t.completed);
    for (let t of completedTodos) {
      await handleDelete(t.id);
    }
  };

  const filteredTodos = todos.filter((t) => {
    if (filter === "all") return true;
    if (filter === "active") return !t.completed;
    return t.completed;
  });

  if (loading) return <p className="text-center mt-10 text-indigo-600 font-semibold">Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Dashboard todos={todos} />

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 sm:p-8 mt-6">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 mb-6 text-center">
            Your Tasks
          </h2>

          <TodoInput onAdd={handleAdd} />

          <TodoList
            todos={filteredTodos}
            onToggle={handleToggle}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />

          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="text-sm text-slate-600 dark:text-slate-200">
              {todos.filter((t) => !t.completed).length} task(s) left
            </div>
            <div className="flex gap-2 flex-wrap">
              {["all", "active", "completed"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f as any)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                    filter === f
                      ? "bg-indigo-600 text-white shadow-md"
                      : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600"
                  }`}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
            <button
              onClick={handleClearCompleted}
              disabled={todos.every((t) => !t.completed)}
              className="text-sm text-red-600 dark:text-red-400 hover:underline disabled:text-slate-400 dark:disabled:text-slate-500"
            >
              Clear completed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}