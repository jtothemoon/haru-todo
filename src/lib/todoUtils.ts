import { TodoItem } from "@/types/todo";

// 특정 우선순위의 완료된 할 일 개수
export const getCompletedCount = (todos: TodoItem[], priority: TodoItem["priority"]) => {
  return todos.filter((todo) => todo.priority === priority && todo.completed).length;
};

// 특정 우선순위의 전체 할 일 개수  
export const getTotalCount = (todos: TodoItem[], priority: TodoItem["priority"]) => {
  return todos.filter((todo) => todo.priority === priority).length;
};

// 특정 우선순위의 진행률 계산
export const getPriorityProgress = (todos: TodoItem[], priority: TodoItem["priority"]) => {
  const completed = getCompletedCount(todos, priority);
  const total = getTotalCount(todos, priority);
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  return {
    completed,
    total,
    percentage,
  };
};

// 전체 진행률 계산
export const getTotalProgress = (todos: TodoItem[]) => {
  const completed = todos.filter((todo) => todo.completed).length;
  const total = todos.length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  return {
    completed,
    total,
    percentage,
  };
};

// 모든 우선순위별 진행률 + 전체 진행률 한 번에 반환
export const getAllProgress = (todos: TodoItem[]) => {
  return {
    high: getPriorityProgress(todos, "high"),
    medium: getPriorityProgress(todos, "medium"),
    low: getPriorityProgress(todos, "low"),
    total: getTotalProgress(todos),
  };
};