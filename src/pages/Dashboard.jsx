import { useMemo, useState } from 'react'
import TodoList from '../components/TodoList.jsx'
import Modal from '../components/Modal.jsx'
import axios from 'axios'

function useDemoTodos() {
  const [items, setItems] = useState([
    { id: '1', title: 'Plan project structure', description: 'Define components and pages for the TODO application', completed: false, priority: 'high', dueDate: '2024-01-15' },
    { id: '2', title: 'Design UI system', description: 'Create Tailwind tokens and design patterns', completed: true, priority: 'medium', dueDate: '2024-01-10' },
    { id: '3', title: 'Implement authentication', description: 'Add login and signup functionality with form validation', completed: false, priority: 'high', dueDate: '2024-01-20' },
    { id: '4', title: 'Add animations', description: 'Implement smooth transitions and loading states', completed: false, priority: 'low', dueDate: '2024-01-25' },
  ])
  return { items, setItems }
}

export default function Dashboard() {
  const { items, setItems } = useDemoTodos()
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)

  // form states
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('medium')
  const [dueDate, setDueDate] = useState('')

  const filtered = useMemo(() => {
    let filteredItems = items

    if (query.trim()) {
      const q = query.trim().toLowerCase()
      filteredItems = filteredItems.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.description?.toLowerCase().includes(q)
      )
    }

    if (filter === 'active') filteredItems = filteredItems.filter((i) => !i.completed)
    else if (filter === 'completed') filteredItems = filteredItems.filter((i) => i.completed)

    return filteredItems
  }, [items, query, filter])

  const stats = useMemo(() => {
    const total = items.length
    const completed = items.filter((i) => i.completed).length
    const active = total - completed
    return { total, completed, active }
  }, [items])

  function openAdd() {
    setEditing(null)
    setTitle('')
    setDescription('')
    setPriority('medium')
    setDueDate('')
    setModalOpen(true)
  }

  function openEdit(item) {
    setEditing(item)
    setTitle(item.title)
    setDescription(item.description || '')
    setPriority(item.priority || 'medium')
    setDueDate(item.dueDate || '')
    setModalOpen(true)
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (!title.trim()) {
      alert('Please enter a task title.')
      return
    }

    const newItem = {
      title: title.trim(),
      description: description.trim(),
      priority,
      due_Date: dueDate || new Date()
    }


	try {
		const data = await axios.post('http://localhost:3000/todo', newItem, {withCredentials: true});
		if(data.status === 200){
			console.log('Form submitted successfully:', data.data);
		setItems([
        ...items,
        { ...newItem, completed: false },
      ])
		}
	} catch (error) {
		console.error('Error submitting the form:', error);
	}


    if (editing) {
      setItems(items.map((i) => (i.id === editing.id ? { ...i, ...newItem } : i)))
    }

    setModalOpen(false)
  }

  function deleteItem(item) {
    setItems(items.filter((i) => i.id !== item.id))
  }

  function toggleItem(item) {
    setItems(
      items.map((i) =>
        i.id === item.id ? { ...i, completed: !i.completed } : i
      )
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background blobs */}
      <div className="pointer-events-none absolute -top-20 -right-20 h-96 w-96 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 opacity-20 blur-3xl animate-spinSlow" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-80 w-80 rounded-full bg-gradient-to-br from-pink-400 to-amber-300 opacity-20 blur-3xl animate-float" />

      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold gradient-text">Your Dashboard</h1>
            <p className="text-slate-600">Stay organized and productive</p>
          </div>
          <button
            onClick={openAdd}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12m6-6H6" />
            </svg>
            Add Task
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard label="Total Tasks" value={stats.total} color="indigo" />
          <StatCard label="Active Tasks" value={stats.active} color="orange" />
          <StatCard label="Completed" value={stats.completed} color="green" />
        </div>

        {/* Search and filters */}
        <div className="glass-card p-6 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
          <input
            className="w-full md:max-w-md px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100"
            placeholder="Search tasks..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="flex gap-2">
            {['all', 'active', 'completed'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-xl capitalize ${
                  filter === f
                    ? 'bg-indigo-600 text-white shadow'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Todo List */}
        <div className="glass-card rounded-2xl overflow-hidden">
          <TodoList items={filtered} onEdit={openEdit} onDelete={deleteItem} onToggle={toggleItem} />
        </div>
      </div>

      {/* Modal */}
      <Modal
        open={modalOpen}
        title={editing ? 'Edit Task' : 'Add New Task'}
        onClose={() => setModalOpen(false)}
        actions={null} // actions come from form buttons
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Task Title
            </label>
            <input
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Prepare meeting notes"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Description
            </label>
            <textarea
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional details about the task"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Priority
              </label>
              <select
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Due Date
              </label>
              <input
                type="date"
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 rounded-xl border-2 border-slate-200 text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700"
            >
              {editing ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

function StatCard({ label, value, color }) {
  return (
    <div className="glass-card rounded-2xl p-6">
      <p className="text-sm text-slate-600">{label}</p>
      <p className={`text-3xl font-bold text-${color}-600`}>{value}</p>
    </div>
  )
}