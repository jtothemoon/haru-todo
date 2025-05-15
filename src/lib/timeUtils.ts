// 현재 시간과 리셋 시간 사이의 남은 시간 계산
export const getRemainingTime = (resetTime: string) => {
  const now = new Date();
  const [hours, minutes] = resetTime.split(':').map(Number);
  
  // 오늘의 리셋 시간 생성
  const resetDate = new Date();
  resetDate.setHours(hours, minutes, 0, 0);
  
  // 이미 리셋 시간이 지났다면 내일의 리셋 시간으로 설정
  if (resetDate <= now) {
    resetDate.setDate(resetDate.getDate() + 1);
  }
  
  // 남은 시간 계산 (밀리초)
  const remainingMs = resetDate.getTime() - now.getTime();
  
  // 시간과 분으로 변환
  const remainingHours = Math.floor(remainingMs / (1000 * 60 * 60));
  const remainingMinutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));
  
  return {
    hours: remainingHours,
    minutes: remainingMinutes,
    totalMs: remainingMs,
  };
};

// 현재 리셋시간을 가져와서 남은 시간 계산 (storage.ts와 연동용)
export const getRemainingTimeFromStorage = () => {
  try {
    const savedTime = localStorage.getItem('haru-reset-time');
    const resetTime = savedTime || '13:36';
    return getRemainingTime(resetTime);
  } catch {
    return getRemainingTime('13:36');
  }
};

// 남은 시간을 문자열로 포맷
export const formatRemainingTime = (hours: number, minutes: number) => {
  return `${hours}시간 ${minutes}분`;
};

// 현재 시간을 HH:MM 형식으로 반환
export const getCurrentTime = () => {
  const now = new Date();
  return now.toTimeString().slice(0, 5);
};

// 날짜를 YYYY-MM-DD 형식으로 반환
export const getDateString = (date: Date = new Date()) => {
  return date.toISOString().split('T')[0];
};

// 시간 포맷 변환 (13:30 → 오후 1:30)
export const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(":");
  const hour = parseInt(hours);
  const isPM = hour >= 12;
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  return `${isPM ? "오후" : "오전"} ${displayHour}:${minutes}`;
};