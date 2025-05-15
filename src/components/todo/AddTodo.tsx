import { TodoItem } from "@/types/todo";

interface AddTodoProps {
  isAdding: boolean;
  newTodoText: string;
  selectedPriority: TodoItem["priority"];
  onStartAdd: () => void;
  onCancel: () => void;
  onTextChange: (text: string) => void;
  onPrioritySelect: (priority: TodoItem["priority"]) => void;
  onAdd: (text: string, priority: TodoItem["priority"]) => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  getPriorityCount: (priority: TodoItem["priority"]) => number;
  canAddTodo: (priority: TodoItem["priority"]) => boolean;
  getErrorMessage: (priority: TodoItem["priority"]) => string;
  isAllPriorityFull: () => boolean;
  PRIORITY_LIMITS: Record<TodoItem["priority"], number>;
}

export default function AddTodo({
  isAdding,
  newTodoText,
  selectedPriority,
  onStartAdd,
  onCancel,
  onTextChange,
  onPrioritySelect,
  onAdd,
  onKeyPress,
  getPriorityCount,
  canAddTodo,
  getErrorMessage,
  isAllPriorityFull,
  PRIORITY_LIMITS,
}: AddTodoProps) {
  if (!isAdding) {
    return (
      <button
        onClick={onStartAdd}
        disabled={isAllPriorityFull()}
        className={`w-full mt-6 p-4 border-2 border-dashed rounded-lg transition-colors ${
          isAllPriorityFull()
            ? "border-gray-200 text-gray-400 cursor-not-allowed"
            : "border-gray-300 text-gray-500 hover:border-gray-400 hover:text-gray-600"
        }`}
      >
        {isAllPriorityFull()
          ? "모든 할 일이 가득 찼습니다 (1/3/5)"
          : "+ 새 할 일 추가"}
      </button>
    );
  }

  return (
    <div className="mt-4 p-4 border-2 border-gray-300 rounded-lg">
      <input
        type="text"
        value={newTodoText}
        onChange={(e) => onTextChange(e.target.value)}
        onKeyDown={onKeyPress}
        placeholder="할 일을 입력하세요..."
        className="w-full p-2 text-lg border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        autoFocus
      />
      
      <div className="flex gap-2 mt-3">
        <button
          onClick={() => onPrioritySelect("high")}
          className={`px-3 py-1 text-sm rounded ${
            selectedPriority === "high"
              ? "bg-red-500 text-white"
              : "bg-red-100 text-red-700"
          }`}
        >
          중요
          <span className="ml-1 text-xs">
            ({getPriorityCount("high")}/{PRIORITY_LIMITS.high})
          </span>
        </button>
        
        <button
          onClick={() => onPrioritySelect("medium")}
          className={`px-3 py-1 text-sm rounded ${
            selectedPriority === "medium"
              ? "bg-orange-500 text-white"
              : "bg-orange-100 text-orange-700"
          }`}
        >
          보통
          <span className="ml-1 text-xs">
            ({getPriorityCount("medium")}/{PRIORITY_LIMITS.medium})
          </span>
        </button>
        
        <button
          onClick={() => onPrioritySelect("low")}
          className={`px-3 py-1 text-sm rounded ${
            selectedPriority === "low"
              ? "bg-gray-500 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          일반
          <span className="ml-1 text-xs">
            ({getPriorityCount("low")}/{PRIORITY_LIMITS.low})
          </span>
        </button>
      </div>

      {!canAddTodo(selectedPriority) && (
        <div className="text-red-500 text-sm mt-2">
          {getErrorMessage(selectedPriority)}
        </div>
      )}

      <div className="flex gap-2 mt-2">
        <button
          onClick={() => onAdd(newTodoText, selectedPriority)}
          disabled={!newTodoText.trim() || !canAddTodo(selectedPriority)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          추가
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          취소
        </button>
      </div>
    </div>
  );
}