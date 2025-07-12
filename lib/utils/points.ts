export function calculatePointsValue(condition: string): number {
  const pointsMap = {
    new: 100,
    "like-new": 80,
    good: 60,
    fair: 40,
    poor: 20,
  }
  return pointsMap[condition as keyof typeof pointsMap] || 50
}

export function formatPoints(points: number): string {
  return `${points} pts`
}

export function canAffordItem(userPoints: number, itemPoints: number): boolean {
  return userPoints >= itemPoints
}
