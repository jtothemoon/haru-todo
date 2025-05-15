import { TodoItem as TodoItemType } from "@/types/todo";
import { priorityColors } from "@/lib/constants";

interface TodoItemProps {
  todo: TodoItemType;
  isEditing: boolean;
  editingText: string;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (todo: TodoItemType) => void;
  onUpdate: (id: string, text: string) => void;
  onCancel: () => void;
  onEditingTextChange: (text: string) => void;
}

export default function TodoItem({
  todo,
  isEditing,
  editingText,
  onToggle,
  onDelete,
  onEdit,
  onUpdate,
  onCancel,
  onEditingTextChange,
}: TodoItemProps) {
  // 키 입력 처리
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onUpdate(todo.id, editingText);
    } else if (e.key === "Escape") {
      onCancel();
    }
  };

  return (
    <div
      className={`
        group flex items-center p-4 border-l-4 rounded-r-lg transition-all hover:shadow-sm relative
        ${priorityColors[todo.priority]}
        ${todo.completed ? "opacity-60" : ""}
      `}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="w-5 h-5 mr-3 rounded cursor-pointer"
      />
      
      {isEditing ? (
        <input
          type="text"
          value={editingText}
          onChange={(e) => onEditingTextChange(e.target.value)}
          onKeyDown={handleKeyPress}
          onBlur={() => onUpdate(todo.id, editingText)}
          className="flex-1 text-lg p-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          autoFocus
        />
      ) : (
        <span
          className={`flex-1 text-lg cursor-pointer ${
            todo.completed
              ? "line-through text-gray-500"
              : "text-gray-800"
          }`}
          onClick={() => onEdit(todo)}
        >
          {todo.text}
        </span>
      )}
      
      <button
        onClick={() => onDelete(todo.id)}
        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 ml-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
        title="삭제"
      >
        ✕
      </button>
    </div>
  );
}