"use client";

import Link from "next/link";
import { useTodos } from "@/hooks/useTodos";

import TodoItem from "./TodoItem";
import AddTodo from "./AddTodo";
import TodoProgress from "./TodoProgress";

export default function TodoList() {
  const {
    todos,
    isLoaded,
    isAdding,
    newTodoText,
    selectedPriority,
    editingId,
    editingText,
    setNewTodoText,
    setEditingText,
    addTodo,
    toggleTodo,
    updateTodo,
    deleteTodo,
    startEditing,
    cancelEditing,
    getPriorityCount,
    canAddTodo,
    getErrorMessage,
    isAllPriorityFull,
    handlePrioritySelect,
    handleAddTodoKeyPress,
    startAdding,
    cancelAdding,
    PRIORITY_LIMITS,
    progress,
    remainingTime,
  } = useTodos();

  // 로딩 중일 때 표시
  if (!isLoaded) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="text-center text-gray-500">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-600">
          ⏰ 오늘 남은 시간: {remainingTime}
        </div>
        <Link
          href="/settings"
          className="text-sm text-gray-500 hover:text-gray-700 underline"
        >
          설정
        </Link>
      </div>
      <TodoProgress progress={progress} />
      <div className="space-y-2">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            isEditing={editingId === todo.id}
            editingText={editingText}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={startEditing}
            onUpdate={updateTodo}
            onCancel={cancelEditing}
            onEditingTextChange={setEditingText}
          />
        ))}
      </div>
      <AddTodo
        isAdding={isAdding}
        newTodoText={newTodoText}
        selectedPriority={selectedPriority}
        onStartAdd={startAdding}
        onCancel={cancelAdding}
        onTextChange={setNewTodoText}
        onPrioritySelect={handlePrioritySelect}
        onAdd={addTodo}
        onKeyPress={handleAddTodoKeyPress}
        getPriorityCount={getPriorityCount}
        canAddTodo={canAddTodo}
        getErrorMessage={getErrorMessage}
        isAllPriorityFull={isAllPriorityFull}
        PRIORITY_LIMITS={PRIORITY_LIMITS}
      />
    </div>
  );
}
