import { TodoItem } from '../types/todo';

const BASE = 'http://localhost:3000/api/todos';

export async function fetchTodos(): Promise<TodoItem[]> {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error('Failed to fetch todos');
  return res.json();
}

export async function createTodo(name: string, deadline: string | null): Promise<TodoItem> {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, deadline }),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || 'Failed to create todo');
  }
  return res.json();
}

export async function toggleTodo(id: string): Promise<TodoItem> {
  const res = await fetch(`${BASE}/${id}/toggle`, { method: 'PATCH' });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || 'Failed to toggle todo');
  }
  return res.json();
}

export async function deleteTodo(id: string): Promise<void> {
  const res = await fetch(`${BASE}/${id}`, { method: 'DELETE' });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || 'Failed to delete todo');
  }
}
