import React from "react";

interface HeaderProps {
  title?: string;
  showTime?: boolean;
  remainingTime?: string;
  rightElement?: React.ReactNode;
}

export default function Header({
  title = "하루살이 TODO",
  showTime = false,
  remainingTime,
  rightElement,
}: HeaderProps) {
  return (
    <header className="max-w-2xl mx-auto p-6 pb-4">
      <div className="flex justify-between items-center">
        {/* 왼쪽: 제목 */}
        <h1 className="text-2xl font-bold">{title}</h1>

        {/* 가운데: 남은 시간 (showTime이 true일 때만) */}
        {showTime && remainingTime && (
          <div className="text-sm text-gray-600">
            ⏰ 오늘 남은 시간: {remainingTime}
          </div>
        )}

        {/* 오른쪽: 사용자 정의 요소 */}
        {rightElement && (
          <div>{rightElement}</div>
        )}
      </div>
    </header>
  );
}