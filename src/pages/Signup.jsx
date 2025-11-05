import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

export default function Signup() {
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		confirmPassword: ''
	})
	const [errors, setErrors] = useState({})
	const [isLoading, setIsLoading] = useState(false)
	const navigate = useNavigate()

	const handleChange = (e) => {
		const { name, value } = e.target
		setFormData(prev => ({ ...prev, [name]: value }))
		if (errors[name]) {
			setErrors(prev => ({ ...prev, [name]: '' }))
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		const newErrors = {}
		
		if (!formData.firstName.trim()) {
			newErrors.firstName = 'First name is required'
		}
		
		if (!formData.lastName.trim()) {
			newErrors.lastName = 'Last name is required'
		}
		
		if (!formData.email) {
			newErrors.email = 'Email is required'
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = 'Email is invalid'
		}
		
		if (!formData.password) {
			newErrors.password = 'Password is required'
		} else if (formData.password.length < 8) {
			newErrors.password = 'Password must be at least 8 characters'
		}
		
		if (formData.password !== formData.confirmPassword) {
			newErrors.confirmPassword = 'Passwords do not match'
		}

		setErrors(newErrors)
		
		if (Object.keys(newErrors).length === 0) {
			setIsLoading(true)
			  try {
    const response = await axios.post(
      "http://localhost:3000/register",
      {
		first_name: formData.firstName,
		last_name: formData.lastName,
		email: formData.email,
		password: formData.password
	  }, 
      {
        withCredentials: true
      }
    );

    if (response.status === 201) {
      console.log("User registered!", response.data.user);
      navigate("/login");
    }
  } catch (error) {
    console.error(error.response?.data || error.message);
  }finally {
				setIsLoading(false)
			}
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-indigo-50 relative overflow-hidden">
			{/* Animated background elements */}
			<div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-float"></div>
			<div className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-r from-indigo-400 to-cyan-400 rounded-full opacity-20 animate-float-delayed"></div>
			<div className="absolute top-1/3 right-1/4 w-24 h-24 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full opacity-15 animate-pulse-glow"></div>
			
			<div className="relative z-10 w-full max-w-md mx-4">
				<div>
					<div className="text-center mb-8">
						<div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
							<svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
							</svg>
						</div>
						<h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
							Create account
						</h1>
						<p className="text-slate-600">Start organizing your tasks today</p>
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

						<div className="grid grid-cols-2 gap-4">
							<div>
								<label className="block text-sm font-medium text-slate-700 mb-2">
									First Name
								</label>
								<input
									type="text"
									name="firstName"
									value={formData.firstName}
									onChange={handleChange}
									disabled={isLoading}
									className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-purple-100 ${
										errors.firstName 
											? 'border-red-300 focus:border-red-500' 
											: 'border-slate-200 focus:border-purple-500'
									} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
									placeholder="John"
								/>
								{errors.firstName && (
									<p className="mt-1 text-sm text-red-600 flex items-center">
										<svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
											<path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
										</svg>
										{errors.firstName}
									</p>
								)}
							</div>

							<div>
								<label className="block text-sm font-medium text-slate-700 mb-2">
									Last Name
								</label>
								<input
									type="text"
									name="lastName"
									value={formData.lastName}
									onChange={handleChange}
									disabled={isLoading}
									className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-purple-100 ${
										errors.lastName 
											? 'border-red-300 focus:border-red-500' 
											: 'border-slate-200 focus:border-purple-500'
									} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
									placeholder="Doe"
								/>
								{errors.lastName && (
									<p className="mt-1 text-sm text-red-600 flex items-center">
										<svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
											<path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
										</svg>
										{errors.lastName}
									</p>
								)}
							</div>
						</div>

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
								className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-purple-100 ${
									errors.email 
										? 'border-red-300 focus:border-red-500' 
										: 'border-slate-200 focus:border-purple-500'
								} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
								placeholder="john@example.com"
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
								className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-purple-100 ${
									errors.password 
										? 'border-red-300 focus:border-red-500' 
										: 'border-slate-200 focus:border-purple-500'
								} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
								placeholder="Create a strong password"
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

						<div>
							<label className="block text-sm font-medium text-slate-700 mb-2">
								Confirm Password
							</label>
							<input
								type="password"
								name="confirmPassword"
								value={formData.confirmPassword}
								onChange={handleChange}
								disabled={isLoading}
								className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-purple-100 ${
									errors.confirmPassword 
										? 'border-red-300 focus:border-red-500' 
										: 'border-slate-200 focus:border-purple-500'
								} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
								placeholder="Confirm your password"
							/>
							{errors.confirmPassword && (
								<p className="mt-1 text-sm text-red-600 flex items-center">
									<svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
										<path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
									</svg>
									{errors.confirmPassword}
								</p>
							)}
						</div>

						<button 
							type="submit"
							disabled={isLoading}
							className={`w-full py-3 px-4 rounded-xl font-semibold focus:outline-none focus:ring-4 focus:ring-purple-100 transition-all duration-200 transform ${
								isLoading 
									? 'bg-slate-400 text-slate-200 cursor-not-allowed' 
									: 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 hover:scale-[1.02] active:scale-[0.98]'
							}`}
						>
							{isLoading ? (
								<div className="flex items-center justify-center">
									<svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
										<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
										<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
									</svg>
									Creating Account...
								</div>
							) : (
								'Create Account'
							)}
						</button>
					</form>

					<div className="mt-6 text-center">
						<p className="text-sm text-slate-600">
							Already have an account?{' '}
							<Link 
								to="/login" 
								className="font-semibold text-purple-600 hover:text-purple-500 transition-colors"
							>
								Sign in here
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}