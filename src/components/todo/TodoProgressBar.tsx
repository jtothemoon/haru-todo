import React from "react";

interface TodoProgressBarProps {
  current: number;
  total: number;
  color?: "red" | "orange" | "gray" | "blue";
}

export default function TodoProgressBar({ 
  current, 
  total, 
  color = "blue" 
}: TodoProgressBarProps) {
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;
  
  const colorClasses = {
    red: "bg-red-500",
    orange: "bg-orange-500", 
    gray: "bg-gray-500",
    blue: "bg-blue-500",
  };

  return (
    <div className="flex items-center space-x-3">
      <span className="text-xs text-gray-500 min-w-12">
        ({current}/{total})
      </span>
      <div className="flex-1 bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${colorClasses[color]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}