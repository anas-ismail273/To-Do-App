import { useState, useEffect, useCallback } from 'react';
import { TodoItem, FilterType } from './types/todo';
import { fetchTodos, createTodo, toggleTodo, deleteTodo } from './services/todoApi';
import TodoForm from './components/TodoForm';
import TodoTable from './components/TodoTable';
import TodoFooter from './components/TodoFooter';

export default function App() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [, setTick] = useState(0);

  const loadTodos = useCallback(async () => {
    try {
      const data = await fetchTodos();
      setTodos(data);
      setError('');
    } catch {
      setError('Failed to load tasks. Is the backend running?');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((t) => t + 1);
    }, 10_000);
    return () => clearInterval(interval);
  }, []);

  const handleAdd = async (name: string, deadline: string | null) => {
    const todo = await createTodo(name, deadline);
    setTodos((prev) => [todo, ...prev]);
  };

  const handleToggle = async (id: string) => {
    const updated = await toggleTodo(id);
    setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
  };

  const handleDelete = async (id: string) => {
    await deleteTodo(id);
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const filteredTodos =
    filter === 'active'
      ? todos.filter((t) => !t.isDone)
      : filter === 'completed'
        ? todos.filter((t) => t.isDone)
        : todos;

  const itemsLeft = todos.filter((t) => !t.isDone).length;

  if (loading) {
    return (
      <div className="container">
        <h1>ToDo App</h1>
        <p className="loading-message">Loading tasks...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>ToDo App</h1>
      {error && <p className="app-error">{error}</p>}
      <TodoForm onAdd={handleAdd} />
      <TodoTable todos={filteredTodos} onToggle={handleToggle} onDelete={handleDelete} />
      {todos.length > 0 && (
        <TodoFooter itemsLeft={itemsLeft} currentFilter={filter} onFilterChange={setFilter} />
      )}
    </div>
  );
}
