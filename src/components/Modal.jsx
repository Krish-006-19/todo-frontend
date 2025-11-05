import { useEffect } from 'react'

export default function Modal({ open, title, children, actions, onClose }) {
	useEffect(() => {
		if (open) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'unset'
		}
		
		return () => {
			document.body.style.overflow = 'unset'
		}
	}, [open])

	useEffect(() => {
		const handleEscape = (e) => {
			if (e.key === 'Escape') {
				onClose()
			}
		}

		if (open) {
			document.addEventListener('keydown', handleEscape)
		}

		return () => {
			document.removeEventListener('keydown', handleEscape)
		}
	}, [open, onClose])

	if (!open) return null
	
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
			{/* Backdrop */}
			<div 
				className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300" 
				onClick={onClose}
			/>
			
			{/* Modal */}
			<div className="relative glass-card rounded-2xl w-full max-w-lg p-6 animate-scale-in shadow-2xl">
				{/* Header */}
				<div className="flex items-center justify-between mb-6">
					<h3 className="text-2xl font-bold text-slate-900">{title}</h3>
					<button
						onClick={onClose}
						className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all duration-200"
					>
						<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>
				
				{/* Content */}
				<div className="mb-6">
					{children}
				</div>
				
				{/* Actions */}
				<div className="flex justify-end gap-3">
					{actions}
				</div>
			</div>
		</div>
	)
}