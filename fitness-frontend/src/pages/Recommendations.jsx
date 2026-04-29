import { useState } from 'react'
import { useSelector } from 'react-redux'
import DashboardLayout from '../components/DashboardLayout'
import {
  useGetRecommendationsByUserQuery,
  useGetRecommendationsByActivityQuery,
} from '../features/recommendations/recommendationApi'

const Recommendations = () => {
  const user = useSelector((state) => state.auth.user)
  const [activityId, setActivityId] = useState('')
  const [selectedActivityId, setSelectedActivityId] = useState('')

  const {
    data: userRecommendations = [],
    isLoading: userLoading,
    isError: userError,
  } = useGetRecommendationsByUserQuery(user?.userId, {
    skip: !user?.userId,
  })

  const {
    data: activityRecommendations = [],
    isLoading: activityLoading,
    isError: activityError,
  } = useGetRecommendationsByActivityQuery(selectedActivityId, {
    skip: !selectedActivityId,
  })

  const displayedRecommendations = selectedActivityId
    ? activityRecommendations
    : userRecommendations

  const isLoading = selectedActivityId ? activityLoading : userLoading
  const isError = selectedActivityId ? activityError : userError

  const handleSearch = (e) => {
    e.preventDefault()
    setSelectedActivityId(activityId.trim())
  }

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Recommendations</h1>
        <p className="text-sm text-slate-400">
          AI-generated analysis and suggestions based on your activity data
        </p>
      </div>

      <form
        onSubmit={handleSearch}
        className="mb-6 flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900 p-4 md:flex-row"
      >
        <input
          type="text"
          value={activityId}
          onChange={(e) => setActivityId(e.target.value)}
          placeholder="Optional: filter by activity ID"
          className="flex-1 rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white"
        />
        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Search
        </button>
        <button
          type="button"
          onClick={() => {
            setActivityId('')
            setSelectedActivityId('')
          }}
          className="rounded-lg bg-slate-700 px-6 py-3 font-semibold text-white hover:bg-slate-600"
        >
          Reset
        </button>
      </form>

      {isLoading && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-slate-300">
          Loading recommendations...
        </div>
      )}

      {isError && (
        <div className="rounded-2xl border border-red-800 bg-red-950/40 p-6 text-red-300">
          Failed to load recommendations.
        </div>
      )}

      {!isLoading && !isError && displayedRecommendations.length === 0 && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-slate-400">
          No recommendations found.
        </div>
      )}

      <div className="space-y-6">
        {!isLoading &&
          !isError &&
          displayedRecommendations.map((item, index) => (
            <div
              key={`${item.activityId}-${index}`}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
            >
              <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">{item.activityType}</h2>
                  <p className="text-sm text-slate-400">Activity ID: {item.activityId}</p>
                  <p className="text-sm text-slate-400">User ID: {item.userId}</p>
                </div>
                <p className="text-sm text-slate-500">
                  {item.createdAt ? new Date(item.createdAt).toLocaleString() : '-'}
                </p>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
                  <h3 className="mb-3 text-lg font-semibold text-white">Analysis</h3>
                  <div className="space-y-2 text-sm text-slate-300">
                    {item.analysis &&
                      Object.entries(item.analysis).map(([key, value]) => (
                        <div key={key} className="rounded-lg bg-slate-800 p-3">
                          <span className="font-semibold text-blue-400">{key}: </span>
                          <span>{value}</span>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
                  <h3 className="mb-3 text-lg font-semibold text-white">Safety</h3>
                  <ul className="space-y-2 text-sm text-slate-300">
                    {item.safety?.map((tip, idx) => (
                      <li key={idx} className="rounded-lg bg-slate-800 p-3">
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
                  <h3 className="mb-3 text-lg font-semibold text-white">Improvements</h3>
                  <div className="space-y-2 text-sm text-slate-300">
                    {item.improvements?.map((improvement, idx) => (
                      <div key={idx} className="rounded-lg bg-slate-800 p-3">
                        {Object.entries(improvement).map(([key, value]) => (
                          <p key={key}>
                            <span className="font-semibold text-emerald-400">{key}: </span>
                            <span>{value}</span>
                          </p>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
                  <h3 className="mb-3 text-lg font-semibold text-white">Suggestions</h3>
                  <div className="space-y-2 text-sm text-slate-300">
                    {item.suggestions?.map((suggestion, idx) => (
                      <div key={idx} className="rounded-lg bg-slate-800 p-3">
                        {Object.entries(suggestion).map(([key, value]) => (
                          <p key={key}>
                            <span className="font-semibold text-yellow-400">{key}: </span>
                            <span>{value}</span>
                          </p>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </DashboardLayout>
  )
}

export default Recommendations