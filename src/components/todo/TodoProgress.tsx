import React from "react";
import TodoProgressBar from "./TodoProgressBar";

interface ProgressData {
  completed: number;
  total: number;
  percentage: number;
}

interface TodoProgressProps {
  progress: {
    high: ProgressData;
    medium: ProgressData;
    low: ProgressData;
    total: ProgressData;
  };
}

export default function TodoProgress({ progress }: TodoProgressProps) {
  return (
    <div className="mb-4 flex items-center space-x-4">
      <TodoProgressBar
        current={progress.high.completed}
        total={progress.high.total}
        color="red"
      />
      <TodoProgressBar
        current={progress.medium.completed}
        total={progress.medium.total}
        color="orange"
      />
      <TodoProgressBar
        current={progress.low.completed}
        total={progress.low.total}
        color="gray"
      />
      <div className="border-l border-gray-300 h-6"></div>
      <TodoProgressBar
        current={progress.total.completed}
        total={progress.total.total}
        color="blue"
      />
    </div>
  );
}