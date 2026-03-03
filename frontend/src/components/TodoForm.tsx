import { useState, FormEvent } from 'react';

interface TodoFormProps {
  onAdd: (name: string, deadline: string | null) => Promise<void>;
}

export default function TodoForm({ onAdd }: TodoFormProps) {
  const [name, setName] = useState('');
  const [deadline, setDeadline] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (name.length <= 10) {
      setError('Task name must be longer than 10 characters.');
      return;
    }

    setSubmitting(true);
    try {
      const dl = deadline ? new Date(deadline).toISOString() : null;
      await onAdd(name, dl);
      setName('');
      setDeadline('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create task.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <input
          type="text"
          placeholder="Enter task name (more than 10 characters)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-input"
        />
        <input
          type="datetime-local"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="form-input form-deadline"
        />
        <button type="submit" className="btn btn-add" disabled={submitting}>
          {submitting ? 'Adding...' : 'Add Task'}
        </button>
      </div>
      {error && <p className="form-error">{error}</p>}
    </form>
  );
}
