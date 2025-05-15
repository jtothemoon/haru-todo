import { DayData, TodoItem } from '@/types/todo';

// 오늘 날짜 YYYY-MM-DD 형태로 반환
export const getTodayString = (): string => {
  return new Date().toISOString().split('T')[0];
};

// localStorage에서 오늘의 데이터 로드
export const loadTodayData = (): TodoItem[] => {
  try {
    // 리셋 체크 먼저 실행
    checkAndResetIfNeeded();
    
    const stored = localStorage.getItem('haru-todo-current');
    
    if (!stored) return [];
    
    const dayData: DayData = JSON.parse(stored);
    
    return dayData.todos;
  } catch (error) {
    console.error('할 일 데이터 로드 실패:', error);
    return [];
  }
};

// localStorage에 오늘의 데이터 저장
export const saveTodayData = (todos: TodoItem[]): void => {
  try {
    const today = getTodayString();
    const dayData: DayData = {
      date: today,
      todos,
      resetTime: getResetTime() // 동적으로 가져옴
    };
    
    localStorage.setItem('haru-todo-current', JSON.stringify(dayData));
  } catch (error) {
    console.error('할 일 데이터 저장 실패:', error);
  }
};

// 리셋 시간 설정 저장/로드
export const getResetTime = (): string => {
  try {
    const savedTime = localStorage.getItem('haru-reset-time');
    if (!savedTime) {
      // 처음 실행시 기본값 저장
      const defaultTime = '13:36';
      localStorage.setItem('haru-reset-time', defaultTime);
      return defaultTime;
    }
    return savedTime;
  } catch {
    return '13:36';
  }
};

export const setResetTime = (time: string): void => {
  localStorage.setItem('haru-reset-time', time);
  setLastResetTimeChanged(); // 변경 시간 기록
};

// 마지막 리셋 날짜 관리
export const getLastResetDate = (): string => {
  return localStorage.getItem('haru-last-reset') || '';
};

export const setLastResetDate = (date: string): void => {
  localStorage.setItem('haru-last-reset', date);
};

// 리셋 체크 및 실행
export const checkAndResetIfNeeded = (): boolean => {
  const now = new Date();
  const today = getTodayString();
  const resetTime = getResetTime();
  // const lastResetDate = getLastResetDate();
  
  // 디버깅용 로그
  // console.log('현재 시간:', now.toLocaleString());
  // console.log('리셋 시간:', resetTime);
  // console.log('마지막 리셋:', lastResetDate);
  // console.log('오늘 날짜:', today);
  
  // 리셋 시간 파싱 (HH:MM)
  const [hours, minutes] = resetTime.split(':').map(Number);
  
  // 개발용: 오늘 이미 리셋했어도 다시 리셋 허용
  // if (lastResetDate === today) {
  //   return false;
  // }
  
  // 현재 시간이 리셋 시간을 지났으면 리셋
  const todayResetTime = new Date();
  todayResetTime.setHours(hours, minutes, 0, 0);
  
  if (now >= todayResetTime) {
    // 리셋 실행
    console.log('리셋 실행!');
    localStorage.removeItem('haru-todo-current');
    setLastResetDate(today);
    return true;
  }
  
  return false;
};

// 마지막 리셋 시간 변경일 확인
export const getLastResetTimeChanged = (): string => {
  return localStorage.getItem('haru-reset-time-changed') || '';
};

// 마지막 변경일 저장
export const setLastResetTimeChanged = (): void => {
  localStorage.setItem('haru-reset-time-changed', new Date().toISOString());
};

// 리셋 시간 변경 가능 여부 체크
export const canChangeResetTime = (): boolean => {
  // 개발용: 24시간 제한 해제
  return true;
  
  /* 원래 코드 (개발 완료 후 주석 해제)
  const lastChanged = getLastResetTimeChanged();
  if (!lastChanged) return true;
  
  const lastChangedTime = new Date(lastChanged);
  const now = new Date();
  const hoursDiff = (now.getTime() - lastChangedTime.getTime()) / (1000 * 60 * 60);
  
  return hoursDiff >= 24;
  */
};

// 다음 변경 가능 시간까지 남은 시간 계산
export const getTimeUntilNextChange = (): string => {
  const lastChanged = getLastResetTimeChanged();
  if (!lastChanged) return '';
  
  const lastChangedTime = new Date(lastChanged);
  const nextChangeTime = new Date(lastChangedTime.getTime() + 24 * 60 * 60 * 1000);
  const now = new Date();
  
  if (now >= nextChangeTime) return '';
  
  const diffMs = nextChangeTime.getTime() - now.getTime();
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  
  return `${hours}시간 ${minutes}분 후`;
};
