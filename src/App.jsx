import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Dashboard from './pages/Dashboard.jsx'

export default function App() {
	const location = useLocation()
	const isAuthPage = location.pathname === '/login' || location.pathname === '/signup'
	
	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
			{!isAuthPage && <Navbar />}
			<main className={isAuthPage ? '' : 'mx-auto max-w-7xl p-4'}>
				<Routes>
					<Route path="/" element={<Navigate to="/dashboard" replace />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/dashboard" element={<Dashboard />} />
				</Routes>
			</main>
		</div>
	)
}