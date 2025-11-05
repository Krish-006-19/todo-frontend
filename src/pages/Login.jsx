import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'

export default function Login() {
	const [formData, setFormData] = useState({
		email: '',
		password: ''
	})
	const [errors, setErrors] = useState({})
	const [isLoading, setIsLoading] = useState(false)
	const navigate = useNavigate()
	const location = useLocation()
	const { login } = useAuth()

	const handleChange = (e) => {
		const { name, value } = e.target
		setFormData(prev => ({ ...prev, [name]: value }))
		// Clear error when user starts typing
		if (errors[name]) {
			setErrors(prev => ({ ...prev, [name]: '' }))
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		const newErrors = {}
		
		if (!formData.email) {
			newErrors.email = 'Email is required'
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = 'Email is invalid'
		}
		
		if (!formData.password) {
			newErrors.password = 'Password is required'
		} else if (formData.password.length < 6) {
			newErrors.password = 'Password must be at least 6 characters'
		}

		setErrors(newErrors)
		
		if (Object.keys(newErrors).length === 0) {
			setIsLoading(true)
			try {
				const res = await login({ email: formData.email, password: formData.password })
				if (res.status === 200) {
					const redirectTo = location.state?.from?.pathname || '/dashboard'
					navigate(redirectTo, { replace: true })
				}
			} catch (error) {
				if (error.response) {
					if (error.response.status === 401) {
						setErrors({ general: 'Invalid email or password' })
					} else {
						setErrors({ general: error.response.data?.message || `Login failed (${error.response.status})` })
					}
				} else if (error.request) {
					setErrors({ general: 'Cannot reach server. Please try again later.' })
				} else {
					setErrors({ general: 'Something went wrong.' })
				}
			} finally {
				setIsLoading(false)
			}
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
			{/* Animated background elements */}
			<div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-20 animate-float"></div>
			<div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-pink-400 to-amber-400 rounded-full opacity-20 animate-float-delayed"></div>
			<div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-15 animate-pulse-glow"></div>
			
			<div className="relative z-10 w-full max-w-md mx-4">
				<div>
					<div className="text-center mb-8">
						<div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
							<svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
						</div>
						<h1 className="text-3xl font-bold gradient-text mb-2">
							Welcome back
						</h1>
						<p className="text-slate-600">Sign in to your account to continue</p>
					</div>

					<form className="space-y-6" onSubmit={handleSubmit}>
						{errors.general && (
							<div className="bg-red-50 border border-red-200 rounded-xl p-4">
								<div className="flex items-center">
									<svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
										<path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
									</svg>
									<p className="text-sm text-red-600">{errors.general}</p>
								</div>
							</div>
						)}

						<div className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-slate-700 mb-2">
									Email Address
								</label>
								<input
									type="email"
									name="email"
									value={formData.email}
									onChange={handleChange}
									disabled={isLoading}
									className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-100 ${
										errors.email 
											? 'border-red-300 focus:border-red-500' 
											: 'border-slate-200 focus:border-indigo-500'
									} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
									placeholder="Enter your email"
								/>
								{errors.email && (
									<p className="mt-1 text-sm text-red-600 flex items-center">
										<svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
											<path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
										</svg>
										{errors.email}
									</p>
								)}
							</div>

							<div>
								<label className="block text-sm font-medium text-slate-700 mb-2">
									Password
								</label>
								<input
									type="password"
									name="password"
									value={formData.password}
									onChange={handleChange}
									disabled={isLoading}
									className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-100 ${
										errors.password 
											? 'border-red-300 focus:border-red-500' 
											: 'border-slate-200 focus:border-indigo-500'
									} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
									placeholder="Enter your password"
								/>
								{errors.password && (
									<p className="mt-1 text-sm text-red-600 flex items-center">
										<svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
											<path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
										</svg>
										{errors.password}
									</p>
								)}
							</div>
						</div>

						<button 
							type="submit"
							disabled={isLoading}
							className={`w-full py-3 px-4 rounded-xl font-semibold focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all duration-200 transform ${
								isLoading 
									? 'bg-slate-400 text-slate-200 cursor-not-allowed' 
									: 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 hover:scale-[1.02] active:scale-[0.98]'
							}`}
						>
							{isLoading ? (
								<div className="flex items-center justify-center">
									<svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
										<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
										<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
									</svg>
									Signing In...
								</div>
							) : (
								'Sign In'
							)}
						</button>
					</form>

					<div className="mt-6 text-center">
						<p className="text-sm text-slate-600">
							Don't have an account?{' '}
							<Link 
								to="/signup" 
								className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors"
							>
								Create one now
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}