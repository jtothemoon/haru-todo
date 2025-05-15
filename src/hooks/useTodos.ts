import { useState, useEffect } from "react";
import { TodoItem } from "@/types/todo";
import {
  loadTodayData,
  saveTodayData,
  checkAndResetIfNeeded,
} from "@/lib/storage";
import { PRIORITY_LIMITS, priorityLabels } from "@/lib/constants";
import { getAllProgress } from "@/lib/todoUtils";
import {
  getRemainingTimeFromStorage,
  formatRemainingTime,
} from "@/lib/timeUtils";

export const useTodos = () => {
  // 상태 관리
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [newTodoText, setNewTodoText] = useState("");
  const [selectedPriority, setSelectedPriority] =
    useState<TodoItem["priority"]>("low");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");

  const [remainingTime, setRemainingTime] = useState("");

  // 초기 데이터 로드
  useEffect(() => {
    setTodos(loadTodayData());
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    // 남은 시간 업데이트 함수
    const updateRemainingTime = () => {
      const { hours, minutes } = getRemainingTimeFromStorage();
      setRemainingTime(formatRemainingTime(hours, minutes));
    };

    // 초기 실행
    updateRemainingTime();

    // 10초마다 업데이트
    const interval = setInterval(updateRemainingTime, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const updateRemainingTimeAndCheckReset = () => {
      // 1. 리셋 체크
      const wasReset = checkAndResetIfNeeded();

      // 2. 리셋되었다면 모든 상태 초기화
      if (wasReset) {
        resetAllStates();
        console.log("🔄 자동 리셋 실행됨");
      }

      // 3. 남은 시간 업데이트
      const { hours, minutes } = getRemainingTimeFromStorage();
      setRemainingTime(formatRemainingTime(hours, minutes));
    };

    // Page Visibility API - 탭 포커스 시 체크
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        updateRemainingTimeAndCheckReset();
      }
    };

    // 초기 실행
    updateRemainingTimeAndCheckReset();

    // 10초마다 체크
    const interval = setInterval(updateRemainingTimeAndCheckReset, 10000);

    // 탭 전환 시 체크
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // 모든 상태 초기화 함수
  const resetAllStates = () => {
    setTodos([]);
    setIsAdding(false);
    setNewTodoText("");
    setSelectedPriority("low");
    setEditingId(null);
    setEditingText("");
  };

  const progress = getAllProgress(todos);

  // 유틸리티 함수들
  const getPriorityCount = (priority: TodoItem["priority"]) => {
    return todos.filter((todo) => todo.priority === priority).length;
  };

  const canAddTodo = (priority: TodoItem["priority"]) => {
    const currentCount = getPriorityCount(priority);
    return currentCount < PRIORITY_LIMITS[priority];
  };

  const getErrorMessage = (priority: TodoItem["priority"]) => {
    const label = priorityLabels[priority];
    const limit = PRIORITY_LIMITS[priority];
    return `❌ ${label}한 일은 최대 ${limit}개까지만 추가할 수 있습니다.`;
  };

  const isAllPriorityFull = () => {
    return !canAddTodo("high") && !canAddTodo("medium") && !canAddTodo("low");
  };

  // CRUD 함수들
  const addTodo = (text: string, priority: TodoItem["priority"] = "low") => {
    if (!canAddTodo(priority)) {
      return;
    }

    const newTodo: TodoItem = {
      id: Date.now().toString(),
      text: text.trim(),
      completed: false,
      priority,
      createdAt: new Date(),
    };
    const newTodos = [...todos, newTodo];

    setTodos(newTodos);
    saveTodayData(newTodos);
    setNewTodoText("");
    setIsAdding(false);
  };

  const toggleTodo = (id: string) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
    saveTodayData(newTodos);
  };

  const updateTodo = (id: string, text: string) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, text: text.trim() } : todo
    );
    setTodos(newTodos);
    saveTodayData(newTodos);
    setEditingId(null);
    setEditingText("");
  };

  const deleteTodo = (id: string) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    saveTodayData(newTodos);
  };

  // 편집 관련 함수들
  const startEditing = (todo: TodoItem) => {
    setEditingId(todo.id);
    setEditingText(todo.text);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingText("");
  };

  // 이벤트 핸들러들
  const handlePrioritySelect = (priority: TodoItem["priority"]) => {
    setSelectedPriority(priority);
    // 우선순위 선택 후 다시 input에 포커스
    setTimeout(() => {
      const input = document.querySelector(
        'input[placeholder="할 일을 입력하세요..."]'
      ) as HTMLInputElement;
      if (input) {
        input.focus();
      }
    }, 0);
  };

  const handleAddTodoKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === "Enter" &&
      newTodoText.trim() &&
      canAddTodo(selectedPriority)
    ) {
      addTodo(newTodoText, selectedPriority);
    } else if (e.key === "Escape") {
      setIsAdding(false);
      setNewTodoText("");
      setSelectedPriority("low");
    }
  };

  // AddTodo 관련 함수들
  const startAdding = () => {
    setIsAdding(true);
    setSelectedPriority("low");
  };

  const cancelAdding = () => {
    setIsAdding(false);
    setNewTodoText("");
    setSelectedPriority("low");
  };

  // 리턴값
  return {
    // 상태
    todos,
    isLoaded,
    isAdding,
    newTodoText,
    selectedPriority,
    editingId,
    editingText,

    // 진행률
    progress,

    // 남은 시간
    remainingTime,

    // 상태 변경 함수
    setNewTodoText,
    setEditingText,

    // CRUD 함수
    addTodo,
    toggleTodo,
    updateTodo,
    deleteTodo,

    // 편집 관련
    startEditing,
    cancelEditing,

    // 유틸리티
    getPriorityCount,
    canAddTodo,
    getErrorMessage,
    isAllPriorityFull,

    // 이벤트 핸들러
    handlePrioritySelect,
    handleAddTodoKeyPress,
    startAdding,
    cancelAdding,

    // 상수
    PRIORITY_LIMITS,
    priorityLabels,
  };
};
