import { TodoItem } from '../types/todo';
import TodoRow from './TodoRow';

interface TodoTableProps {
  todos: TodoItem[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoTable({ todos, onToggle, onDelete }: TodoTableProps) {
  if (todos.length === 0) {
    return <p className="empty-message">No tasks yet</p>;
  }

  return (
    <div className="table-wrapper">
      <table className="todo-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Deadline</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <TodoRow
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
