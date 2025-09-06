import TodoApp from "../components/TodoApp"
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"

export default function Todos() {
  return (
    <div className="flex">
      {/* Sidebar for desktop */}
      <Sidebar />

      {/* Mobile Navbar */}
      <Navbar />

      {/* Main content */}
      <main className="flex-1 ml-0 sm:ml-64 p-6">
        <TodoApp />
      </main>
    </div>
  )
}
