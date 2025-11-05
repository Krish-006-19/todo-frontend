export default function LoadingSpinner() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
			<div className="text-center">
				<div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center animate-pulse">
					<svg className="w-8 h-8 text-white animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
				</div>
				<h2 className="text-xl font-semibold text-slate-900 mb-2">Loading ProTodo</h2>
				<p className="text-slate-600">Please wait while we set up your workspace...</p>
			</div>
		</div>
	)
}
