import { useSelector } from 'react-redux'
import DashboardLayout from '../components/DashboardLayout'
import {
  useGetMyActivitiesQuery,
  useDeleteActivityMutation,
  useGetAllActivitiesQuery,
} from '../features/activities/activityApi'

const formatMetricLabel = (key) => {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase())
}

const formatMetricValue = (value) => {
  if (Array.isArray(value)) return value.join(', ')
  if (typeof value === 'object' && value !== null) return Object.values(value).join(', ')
  return String(value)
}

const renderMetrics = (metrics) => {
  if (!metrics || Object.keys(metrics).length === 0) {
    return <span className="text-xs text-slate-500">No metrics</span>
  }

  return (
    <div className="flex flex-wrap gap-2">
      {Object.entries(metrics).map(([key, value]) => (
        <span
          key={key}
          className="rounded-full border border-slate-700 bg-slate-800 px-2.5 py-1 text-xs text-slate-300"
        >
          <span className="font-medium text-white">{formatMetricLabel(key)}:</span>{' '}
          {formatMetricValue(value)}
        </span>
      ))}
    </div>
  )
}

const Activities = () => {
  const user = useSelector((state) => state.auth.user)
  const isAdmin = user?.role === 'ROLE_ADMIN'
  const userId = user?.userId || user?.id || user?.sub

  const {
    data: userActivities = [],
    isLoading: userLoading,
    isError: userError,
    refetch: refetchUserActivities,
    isFetching: isFetchingUser,
  } = useGetMyActivitiesQuery(userId, {
    skip: !userId || isAdmin,
  })

  const {
    data: allActivities = [],
    isLoading: adminLoading,
    isError: adminError,
    refetch: refetchAllActivities,
    isFetching: isFetchingAdmin,
  } = useGetAllActivitiesQuery(undefined, {
    skip: !isAdmin,
  })

  const [deleteActivity, { isLoading: deleting }] = useDeleteActivityMutation()

  const activities = isAdmin ? allActivities : userActivities
  const isLoading = isAdmin ? adminLoading : userLoading
  const isError = isAdmin ? adminError : userError
  const isFetching = isAdmin ? isFetchingAdmin : isFetchingUser
  const refetch = isAdmin ? refetchAllActivities : refetchUserActivities

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Delete this activity?')
    if (!confirmed) return

    try {
      await deleteActivity(id).unwrap()
      refetch()
    } catch (error) {
      console.error('Delete failed:', error)
    }
  }

  return (
    <DashboardLayout>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Activities</h1>
          <p className="text-sm text-slate-400">
            {isAdmin ? 'All users activity records' : 'Your tracked activity records'}
          </p>
        </div>

        <button
          type="button"
          onClick={refetch}
          disabled={isFetching}
          className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 disabled:opacity-50"
        >
          {isFetching ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {isLoading && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-slate-300">
          Loading activities...
        </div>
      )}

      {isError && (
        <div className="rounded-2xl border border-red-800 bg-red-950/40 p-6 text-red-300">
          Failed to load activities.
        </div>
      )}

      {!isLoading && !isError && activities.length === 0 && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-slate-400">
          No activities found.
        </div>
      )}

      {!isLoading && !isError && activities.length > 0 && (
        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900">
          <table className="min-w-full text-left text-sm text-slate-300">
            <thead className="border-b border-slate-800 bg-slate-950/50 text-slate-400">
              <tr>
                {isAdmin && <th className="px-6 py-4">User ID</th>}
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Duration</th>
                <th className="px-6 py-4">Calories</th>
                <th className="px-6 py-4">Start Time</th>
                <th className="px-6 py-4">Created At</th>
                <th className="px-6 py-4">Metrics</th>
                {!isAdmin && <th className="px-6 py-4">Actions</th>}
              </tr>
            </thead>

            <tbody>
              {activities.map((activity) => (
                <tr
                  key={activity.id}
                  className="border-b border-slate-800 last:border-0 align-top"
                >
                  {isAdmin && (
                    <td className="px-6 py-4 text-xs break-all text-slate-400">
                      {activity.userId}
                    </td>
                  )}

                  <td className="px-6 py-4 font-medium text-white">{activity.type}</td>
                  <td className="px-6 py-4">{activity.duration} min</td>
                  <td className="px-6 py-4">{activity.caloriesBurned}</td>
                  <td className="px-6 py-4">
                    {activity.startTime
                      ? new Date(activity.startTime).toLocaleString()
                      : '-'}
                  </td>
                  <td className="px-6 py-4">
                    {activity.createdAt
                      ? new Date(activity.createdAt).toLocaleString()
                      : '-'}
                  </td>
                  <td className="px-6 py-4 max-w-md">
                    {renderMetrics(activity.additionalMetrics)}
                  </td>

                  {!isAdmin && (
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(activity.id)}
                        disabled={deleting}
                        className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50"
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardLayout>
  )
}

export default Activities