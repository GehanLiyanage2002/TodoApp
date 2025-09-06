import { Link } from "react-router-dom"
import Landing from "../components/Landing"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-6">
      <Landing />
      <Link
        to="/todos"
        className="mt-8 px-6 py-3 bg-indigo-600 text-white rounded-xl shadow-lg hover:bg-indigo-700 transition"
      >
        Get Started
      </Link>
    </div>
  )
}
