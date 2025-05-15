export const PRIORITY_LIMITS = {
  high: 1,
  medium: 3,
  low: 5,
} as const;

export const priorityLabels = {
  high: "중요",
  medium: "보통",
  low: "일반",
} as const;

export const priorityColors = {
  high: "border-l-red-500 bg-red-50",
  medium: "border-l-orange-500 bg-orange-50",
  low: "border-l-gray-400 bg-gray-50",
};