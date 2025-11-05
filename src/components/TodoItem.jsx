export default function TodoItem({ item, onEdit, onDelete, onToggle }) {
	const getPriorityColor = (priority) => {
		switch (priority) {
			case 'high': return 'bg-red-100 text-red-800 border-red-200'
			case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
			case 'low': return 'bg-green-100 text-green-800 border-green-200'
			default: return 'bg-slate-100 text-slate-800 border-slate-200'
		}
	}

	const getPriorityIcon = (priority) => {
		switch (priority) {
			case 'high': return (
				<svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
					<path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
				</svg>
			)
			case 'medium': return (
				<svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
					<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
				</svg>
			)
			case 'low': return (
				<svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
					<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
				</svg>
			)
			default: return null
		}
	}

	const formatDate = (dateString) => {
		if (!dateString) return null
		const date = new Date(dateString)
		const now = new Date()
		const diffTime = date - now
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
		
		if (diffDays < 0) return { text: 'Overdue', color: 'text-red-600' }
		if (diffDays === 0) return { text: 'Due today', color: 'text-orange-600' }
		if (diffDays === 1) return { text: 'Due tomorrow', color: 'text-yellow-600' }
		if (diffDays <= 7) return { text: `Due in ${diffDays} days`, color: 'text-blue-600' }
		return { text: date.toLocaleDateString(), color: 'text-slate-600' }
	}

	const dueDateInfo = formatDate(item.dueDate)

	return (
		<li className="group p-6 hover:bg-slate-50/50 transition-all duration-200 border-b border-slate-100 last:border-b-0">
			<div className="flex items-start gap-4">
				{/* Checkbox */}
				<button
					onClick={onToggle}
					className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
						item.completed
							? 'bg-green-500 border-green-500 text-white'
							: 'border-slate-300 hover:border-indigo-500 hover:bg-indigo-50'
					}`}
				>
					{item.completed && (
						<svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
							<path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
						</svg>
					)}
				</button>

				{/* Content */}
				<div className="flex-1 min-w-0">
					<div className="flex items-start justify-between gap-4">
						<div className="flex-1 min-w-0">
							<h3 className={`text-lg font-semibold mb-2 transition-all duration-200 ${
								item.completed 
									? 'line-through text-slate-500' 
									: 'text-slate-900'
							}`}>
								{item.title}
							</h3>
							
							{item.description && (
								<p className={`text-sm mb-3 transition-all duration-200 ${
									item.completed ? 'text-slate-400' : 'text-slate-600'
								}`}>
									{item.description}
								</p>
							)}

							{/* Meta information */}
							<div className="flex flex-wrap items-center gap-3">
								{/* Priority */}
								{item.priority && (
									<span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(item.priority)}`}>
										{getPriorityIcon(item.priority)}
										{item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}
									</span>
								)}

								{/* Due date */}
								{dueDateInfo && (
									<span className={`text-xs font-medium ${dueDateInfo.color}`}>
										{dueDateInfo.text}
									</span>
								)}
							</div>
						</div>

						{/* Actions */}
						<div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
							<button
								onClick={onEdit}
								className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200"
								title="Edit task"
							>
								<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
								</svg>
							</button>
							
							<button
								onClick={onDelete}
								className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
								title="Delete task"
							>
								<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
								</svg>
							</button>
						</div>
					</div>
			</div>
			</div>
		</li>
	)
}