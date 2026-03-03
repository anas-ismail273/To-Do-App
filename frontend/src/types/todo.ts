export interface TodoItem {
  id: string;
  name: string;
  deadline: string | null;
  isDone: boolean;
  createdAt: string;
}

export type FilterType = 'all' | 'active' | 'completed';
