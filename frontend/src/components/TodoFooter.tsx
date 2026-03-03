import { FilterType } from '../types/todo';

interface TodoFooterProps {
  itemsLeft: number;
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const filters: { label: string; value: FilterType }[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
];

export default function TodoFooter({ itemsLeft, currentFilter, onFilterChange }: TodoFooterProps) {
  return (
    <div className="todo-footer">
      <span className="items-left">
        {itemsLeft} {itemsLeft === 1 ? 'item' : 'items'} left
      </span>
      <div className="filter-tabs">
        {filters.map((f) => (
          <button
            key={f.value}
            className={`btn btn-filter ${currentFilter === f.value ? 'btn-filter-active' : ''}`}
            onClick={() => onFilterChange(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
}
