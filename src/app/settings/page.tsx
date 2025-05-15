"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  getResetTime,
  setResetTime as saveResetTime,
  canChangeResetTime,
  getTimeUntilNextChange,
} from "@/lib/storage";

export default function SettingsPage() {
  const [resetTime, setResetTime] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newResetTime, setNewResetTime] = useState("");
  const [canChange, setCanChange] = useState(true);
  const [timeUntilChange, setTimeUntilChange] = useState("");

  useEffect(() => {
    setResetTime(getResetTime());
    setCanChange(canChangeResetTime());
    setTimeUntilChange(getTimeUntilNextChange());
    setIsLoaded(true);
  }, []);

  // 시간 포맷 변환 (13:30 → 오후 1:30)
  const formatTime = (time: string): string => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const isPM = hour >= 12;
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${isPM ? "오후" : "오전"} ${displayHour}:${minutes}`;
  };

  const handleEditClick = () => {
    setNewResetTime(resetTime);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!canChange) return;

    setResetTime(newResetTime);
    saveResetTime(newResetTime);
    setCanChange(false);
    setTimeUntilChange("24시간 0분 후");
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setNewResetTime("");
  };

  if (!isLoaded) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="text-center text-gray-500">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">설정</h1>

      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-3">자동 리셋 시간</h2>
          <p className="text-gray-600 text-sm mb-4">
            설정된 시간에 모든 할 일이 자동으로 삭제됩니다.
          </p>

          <div className="border border-gray-300 rounded p-4">
            {isEditing ? (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    새 리셋 시간
                  </label>
                  <input
                    type="time"
                    value={newResetTime}
                    onChange={(e) => setNewResetTime(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    저장
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  >
                    취소
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center">
                  <p>현재 리셋 시간: {formatTime(resetTime)}</p>
                  <button
                    onClick={handleEditClick}
                    disabled={!canChange}
                    className={`px-4 py-2 rounded ${
                      canChange
                        ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        : "bg-gray-50 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    변경
                  </button>
                </div>
                {!canChange && timeUntilChange && (
                  <p className="text-sm text-orange-600 mt-2">
                    ⏰ {timeUntilChange} 변경 가능
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <Link href="/" className="text-blue-500 hover:text-blue-600">
          ← 메인으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
