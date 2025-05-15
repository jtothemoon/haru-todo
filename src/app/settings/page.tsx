"use client";

import Link from "next/link";
import Header from "@/components/layout/Header";
import { useSettings } from "@/hooks/useSettings";
import { formatTime } from "@/lib/timeUtils";

export default function SettingsPage() {
  const {
    resetTime,
    isLoaded,
    isEditing,
    newResetTime,
    canChange,
    timeUntilChange,
    setNewResetTime,
    handleEditClick,
    handleSave,
    handleCancel,
  } = useSettings();

  if (!isLoaded) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="text-center text-gray-500">로딩 중...</div>
      </div>
    );
  }

  return (
    <main className="container mx-auto">
      <Header 
        title="설정"
        rightElement={
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-gray-700 underline"
          >
            ← 홈으로
          </Link>
        }
      />
      
      <div className="max-w-2xl mx-auto p-6 pt-0">
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
      </div>
    </main>
  );
}