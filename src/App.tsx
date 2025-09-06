import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Todos from "./pages/Todos"
import Navbar from "./components/Navbar"

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-slate-50 to-purple-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todos" element={<Todos />} />
      </Routes>
    </div>
  )
}
