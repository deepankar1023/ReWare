export function calculateItemPoints(condition: string): number {
  const pointsMap: Record<string, number> = {
    new: 100,
    "like-new": 80,
    good: 60,
    fair: 40,
    poor: 20,
  }

  return pointsMap[condition] || 50
}

export function calculateSwapPoints(itemValue: number, swapValue: number): number {
  const difference = Math.abs(itemValue - swapValue)
  return Math.max(0, difference)
}
