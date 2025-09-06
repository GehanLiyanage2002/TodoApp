import { useState, useEffect } from "react"
import TodoInput from "./TodoInput"
import TodoList from "./TodoList"
import Dashboard from "./Dashboard"

export interface Todo {
    id: string
    text: string
    completed: boolean
    createdAt: number
}

const LS_KEY = "taskflow-todos"

const generateId = () =>
    Date.now().toString(36) + Math.random().toString(36).slice(2, 8)

export default function TodoApp() {
    const [todos, setTodos] = useState<Todo[]>(() => {
        const saved = localStorage.getItem(LS_KEY)
        return saved ? JSON.parse(saved) : []
    })
    const [filter, setFilter] = useState<"all" | "active" | "completed">("all")

    useEffect(() => {
        localStorage.setItem(LS_KEY, JSON.stringify(todos))
    }, [todos])

    const addTodo = (text: string) => {
        setTodos([{ id: generateId(), text, completed: false, createdAt: Date.now() }, ...todos])
    }

    const toggleTodo = (id: string) => {
        setTodos(todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))
    }

    const deleteTodo = (id: string) => {
        setTodos(todos.filter((t) => t.id !== id))
    }

    const updateTodo = (id: string, text: string) => {
        setTodos(todos.map((t) => (t.id === id ? { ...t, text } : t)))
    }

    const clearCompleted = () => {
        setTodos(todos.filter((t) => !t.completed))
    }

    const filteredTodos = todos.filter((t) => {
        if (filter === "all") return true
        if (filter === "active") return !t.completed
        return t.completed
    })

    return (
        <div className="w-full max-w-3xl mx-auto">
            {/* Dashboard */}
            <Dashboard todos={todos} />

            {/* Todo App */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mt-6">
                <h2 className="text-3xl font-bold text-indigo-600 mb-6 text-center">Your Tasks</h2>
                <TodoInput onAdd={addTodo} />
                <TodoList todos={filteredTodos} onToggle={toggleTodo} onDelete={deleteTodo} onUpdate={updateTodo} />

                {/* Footer */}
                <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="text-sm text-slate-600">
                        {todos.filter((t) => !t.completed).length} task(s) left
                    </div>
                    <div className="flex gap-2">
                        {["all", "active", "completed"].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f as any)}
                                className={`px-3 py-1 rounded-full text-sm transition ${filter === f
                                        ? "bg-indigo-600 text-white"
                                        : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                                    }`}
                            >
                                {f.charAt(0).toUpperCase() + f.slice(1)}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={clearCompleted}
                        disabled={todos.every((t) => !t.completed)}
                        className="text-sm text-red-600 hover:underline disabled:text-slate-400"
                    >
                        Clear completed
                    </button>
                </div>
            </div>
        </div>
    )
}
