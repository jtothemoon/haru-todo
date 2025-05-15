export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  createdAt: Date;
}

export interface DayData {
  date: string; // YYYY-MM-DD
  todos: TodoItem[];
  resetTime: string; // HH:MM
}