import { TodoItem } from '../types/todo';

interface TodoRowProps {
  todo: TodoItem;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

function formatDeadline(deadline: string | null): string {
  if (!deadline) return '\u2014';
  const d = new Date(deadline);
  const day = d.getDate().toString().padStart(2, '0');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  const hours = d.getHours().toString().padStart(2, '0');
  const minutes = d.getMinutes().toString().padStart(2, '0');
  return `${day} ${month} ${year}, ${hours}:${minutes}`;
}

export default function TodoRow({ todo, onToggle, onDelete }: TodoRowProps) {
  const isOverdue =
    todo.deadline !== null &&
    new Date(todo.deadline) < new Date() &&
    !todo.isDone;

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(todo.id);
    }
  };

  return (
    <tr className={isOverdue ? 'row-overdue' : ''}>
      <td className={todo.isDone ? 'text-done' : ''}>{todo.name}</td>
      <td>{formatDeadline(todo.deadline)}</td>
      <td>
        <span className={`status-badge ${todo.isDone ? 'status-done' : 'status-active'}`}>
          {todo.isDone ? 'Done' : 'Active'}
        </span>
      </td>
      <td className="actions-cell">
        <button
          className={`btn btn-toggle ${todo.isDone ? 'btn-undo' : 'btn-done'}`}
          onClick={() => onToggle(todo.id)}
        >
          {todo.isDone ? 'Undo' : 'Done'}
        </button>
        <button className="btn btn-delete" onClick={handleDelete}>
          ✕
        </button>
      </td>
    </tr>
  );
}
