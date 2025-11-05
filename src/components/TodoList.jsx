import { useEffect, useState } from 'react';
import TodoItem from './TodoItem.jsx';
import axios from 'axios';

export default function TodoList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // ✅ Fetch todos from backend
  useEffect(() => {
    async function fetchTodos() {
      try {
        const res = await axios.get('http://localhost:3000/todo', { withCredentials: true });
        setItems(res.data.todo || []);
      } catch (err) {
        console.error('Error fetching todos:', err);
        setError('Failed to load tasks. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchTodos();
  }, []);

  // ✅ Loading state
  if (loading) {
    return (
      <div className="p-12 text-center text-slate-500">
        <div className="animate-spin w-8 h-8 border-4 border-indigo-300 border-t-transparent rounded-full mx-auto mb-4"></div>
        Loading your tasks...
      </div>
    );
  }

  // ✅ Error state
  if (error) {
    return (
      <div className="p-12 text-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  // ✅ Empty list state
  if (items.length === 0) {
    return (
      <div className="p-12 text-center">
        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
          <svg className="w-12 h-12 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-slate-900 mb-2">No tasks yet</h3>
        <p className="text-slate-500">Start by adding a new task above.</p>
      </div>
    );
  }

  // ✅ Render todos
  return (
    <ul className="divide-y divide-slate-100">
      {items.map((it, index) => (
        <li key={index}>
          <TodoItem/>
        </li>
      ))}
    </ul>
  );
}