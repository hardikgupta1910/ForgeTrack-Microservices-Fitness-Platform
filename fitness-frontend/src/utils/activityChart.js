export const groupActivitiesByDate = (activities = []) => {
  const grouped = {}

  activities.forEach((activity) => {
    const rawDate = activity.startTime || activity.createdAt
    if (!rawDate) return

    const dateKey = new Date(rawDate).toISOString().split('T')[0]
    const displayDate = new Date(rawDate).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
    })

    if (!grouped[dateKey]) {
      grouped[dateKey] = {
        date: displayDate,
        sortDate: dateKey,
        activities: 0,
      }
    }

    grouped[dateKey].activities += 1
  })

  return Object.values(grouped).sort(
    (a, b) => new Date(a.sortDate) - new Date(b.sortDate)
  )
}

export const groupActivitiesByType = (activities = []) => {
  const grouped = {}

  activities.forEach((activity) => {
    const type = activity.type || 'OTHER'
    grouped[type] = (grouped[type] || 0) + 1
  })

  const colors = [
    '#3b82f6',
    '#22c55e',
    '#f59e0b',
    '#ef4444',
    '#a855f7',
    '#06b6d4',
    '#f97316',
    '#84cc16',
  ]

  return Object.entries(grouped).map(([type, value], index) => ({
    type,
    value,
    fill: colors[index % colors.length],
  }))
}