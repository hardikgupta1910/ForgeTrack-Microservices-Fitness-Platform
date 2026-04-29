import { useSelector } from 'react-redux'
import DashboardLayout from '../components/DashboardLayout'
import {
  useGetMyActivitiesQuery,
  useGetAllActivitiesQuery,
} from '../features/activities/activityApi'
import {
  groupActivitiesByDate,
  groupActivitiesByType,
} from '../utils/activityChart'

import ActivityTrendChart from '../components/charts/ActivityTrendChart'

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user)
  const isAdmin = user?.role === 'ROLE_ADMIN'
  const userId = user?.userId || user?.id || user?.sub

  const {
    data: myActivities = [],
    isLoading: loadingMyActivities,
  } = useGetMyActivitiesQuery(userId, {
    skip: !userId || isAdmin,
  })

  const {
    data: allActivities = [],
    isLoading: loadingAllActivities,
  } = useGetAllActivitiesQuery(undefined, {
    skip: !isAdmin,
  })

  const activities = isAdmin ? allActivities : myActivities
  const isLoading = isAdmin ? loadingAllActivities : loadingMyActivities

  const trendData = groupActivitiesByDate(activities)
  const typeData = groupActivitiesByType(activities)

  const totalActivities = activities.length
  const totalCalories = activities.reduce(
    (sum, activity) => sum + Number(activity.caloriesBurned || 0),
    0
  )
  const totalDuration = activities.reduce(
    (sum, activity) => sum + Number(activity.duration || 0),
    0
  )

  return (
    <DashboardLayout>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-sm text-slate-400">Current Role</p>
          <h3 className="mt-2 text-2xl font-bold text-white">{user?.role}</h3>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-sm text-slate-400">User ID</p>
          <h3 className="mt-2 text-sm font-semibold break-all text-white">
            {user?.userId || user?.id}
          </h3>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-sm text-slate-400">Total Activities</p>
          <h3 className="mt-2 text-2xl font-bold text-white">{totalActivities}</h3>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-sm text-slate-400">Total Calories</p>
          <h3 className="mt-2 text-2xl font-bold text-white">{totalCalories}</h3>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold text-white">
            {isAdmin ? 'Summary' : 'Activity Summary'}
          </h3>
          <p className="mt-3 text-slate-400">
            {isAdmin
              ? `You are viewing ${totalActivities} total activities across all users with ${totalCalories} calories burned and ${totalDuration} total minutes tracked.`
              : `You have logged ${totalActivities} activities with ${totalCalories} calories burned and ${totalDuration} total minutes tracked.`}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="text-lg font-semibold text-white">Account</h3>
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            <p>
              <span className="text-slate-500">Email:</span> {user?.sub}
            </p>
            <p>
              <span className="text-slate-500">Role:</span> {user?.role}
            </p>
            <p>
              <span className="text-slate-500">User ID:</span> {user?.userId || user?.id}
            </p>
            <p>
              <span className="text-slate-500">Duration:</span> {totalDuration} min
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        {isLoading ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-slate-300">
            Loading chart data...
          </div>
        ) : (
          <ActivityTrendChart
            trendData={trendData}
            typeData={typeData}
            title={isAdmin ? 'Platform Activity Trends' : 'Your Activity Trends'}
            description={
              isAdmin
                ? 'Daily activity count across all users'
                : 'Daily activity count based on your stored records'
            }
          />
        )}
      </div>
    </DashboardLayout>
  )
}

export default Dashboard