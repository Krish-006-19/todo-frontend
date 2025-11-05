import { Link, NavLink, useLocation } from 'react-router-dom'

export default function Navbar() {
	const location = useLocation()
	const isAuthPage = location.pathname === '/login' || location.pathname === '/signup'
	
	return (
		<header className="glass-nav sticky top-0 z-20">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					{/* Logo */}
					<Link 
						to="/dashboard" 
						className="flex items-center gap-2 text-xl font-bold gradient-text hover:scale-105 transition-transform duration-200"
					>
						<div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
							<svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
						</div>
						ProTodo
					</Link>

					{/* Navigation */}
					{!isAuthPage && (
						<nav className="hidden md:flex items-center gap-1">
							<NavLink 
								to="/dashboard" 
								className={({isActive}) => `px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
									isActive 
										? 'bg-indigo-600 text-white shadow-lg' 
										: 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50'
								}`}
							>
								<div className="flex items-center gap-2">
									<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
									</svg>
									Dashboard
								</div>
							</NavLink>
						</nav>
					)}

					{/* Auth Links */}
					{isAuthPage && (
						<nav className="flex items-center gap-2">
							<Link 
								to="/login" 
								className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
									location.pathname === '/login'
										? 'bg-indigo-600 text-white shadow-lg' 
										: 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50'
								}`}
							>
								Sign In
							</Link>
							<Link 
								to="/signup" 
								className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
									location.pathname === '/signup'
										? 'bg-purple-600 text-white shadow-lg' 
										: 'text-slate-600 hover:text-purple-600 hover:bg-purple-50'
								}`}
							>
								Sign Up
							</Link>
						</nav>
					)}

					{/* Mobile menu button */}
					<div className="md:hidden">
						<button className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200">
							<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
							</svg>
						</button>
					</div>
				</div>
			</div>
		</header>
	)
}