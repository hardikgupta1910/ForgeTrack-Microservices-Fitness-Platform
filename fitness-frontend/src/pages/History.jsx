// import { useState } from 'react'
// import DashboardLayout from '../components/DashboardLayout'
// import { useGetActivityHistoryQuery } from '../features/activities/activityApi'

// const ACTIVITY_TYPE_OPTIONS = [
//   { value: 'RUNNING', label: 'Running' },
//   { value: 'WALKING', label: 'Walking' },
//   { value: 'CYCLING', label: 'Cycling' },
//   { value: 'WEIGHT_TRAINING', label: 'Weight Training' },
//   { value: 'CARDIO', label: 'Cardio' },
//   { value: 'SWIMMING', label: 'Swimming' },
//   { value: 'HIIT', label: 'HIIT' },
//   { value: 'YOGA', label: 'Yoga' },
//   { value: 'STRETCHING', label: 'Stretching' },
//   { value: 'OTHER', label: 'Other' },
// ]

// const formatMetricLabel = (key) => {
//   return key
//     .replace(/([A-Z])/g, ' $1')
//     .replace(/^./, (str) => str.toUpperCase())
// }

// const formatMetricValue = (value) => {
//   if (Array.isArray(value)) return value.join(', ')
//   if (typeof value === 'object' && value !== null) return Object.values(value).join(', ')
//   return String(value)
// }

// const formatActivityType = (value) => {
//   if (!value) return '-'
//   return value
//     .toLowerCase()
//     .split('_')
//     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//     .join(' ')
// }

// const renderMetrics = (metrics) => {
//   if (!metrics || Object.keys(metrics).length === 0) {
//     return <span className="text-xs text-slate-500">No metrics</span>
//   }

//   return (
//     <div className="flex flex-wrap gap-2">
//       {Object.entries(metrics).map(([key, value]) => (
//         <span
//           key={key}
//           className="rounded-full border border-slate-700 bg-slate-800 px-2.5 py-1 text-xs text-slate-300"
//         >
//           <span className="font-medium text-white">{formatMetricLabel(key)}:</span>{' '}
//           {formatMetricValue(value)}
//         </span>
//       ))}
//     </div>
//   )
// }

// const History = () => {
//   const [filters, setFilters] = useState({
//     type: '',
//     fromDate: '',
//     toDate: '',
//     page: 0,
//     size: 10,
//     sortBy: 'startTime',
//     sortDir: 'desc',
//   })

//   const { data, isLoading, isError, isFetching, refetch } = useGetActivityHistoryQuery(filters)

//   const activities = data?.content || []
//   const currentPage = data?.page || 0
//   const totalPages = data?.totalPages || 0
//   const totalElements = data?.totalElements || 0
//   const isLast = data?.last ?? true

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFilters((prev) => ({
//       ...prev,
//       [name]: value,
//       page: 0,
//     }))
//   }

//   const handleSearch = (e) => {
//     e.preventDefault()
//     refetch()
//   }

//   const handleReset = () => {
//     setFilters({
//       type: '',
//       fromDate: '',
//       toDate: '',
//       page: 0,
//       size: 10,
//       sortBy: 'startTime',
//       sortDir: 'desc',
//     })
//   }

//   const handlePrevPage = () => {
//     if (currentPage > 0) {
//       setFilters((prev) => ({
//         ...prev,
//         page: prev.page - 1,
//       }))
//     }
//   }

//   const handleNextPage = () => {
//     if (!isLast) {
//       setFilters((prev) => ({
//         ...prev,
//         page: prev.page + 1,
//       }))
//     }
//   }

//   return (
//     <DashboardLayout>
//       <div className="mb-6 flex items-start justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-white">History</h1>
//           <p className="text-sm text-slate-400">Filter and browse your past activity records</p>
//         </div>

//         <button
//           type="button"
//           onClick={refetch}
//           disabled={isFetching}
//           className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 disabled:opacity-50"
//         >
//           {isFetching ? 'Refreshing...' : 'Refresh'}
//         </button>
//       </div>

//       <form
//         onSubmit={handleSearch}
//         className="mb-6 grid gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-4 md:grid-cols-6"
//       >
//         <div>
//           <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-400">
//             Type
//           </label>
//           <select
//             name="type"
//             value={filters.type}
//             onChange={handleChange}
//             className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none"
//           >
//             <option value="">All</option>
//             {ACTIVITY_TYPE_OPTIONS.map((option) => (
//               <option key={option.value} value={option.value}>
//                 {option.label}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-400">
//             From
//           </label>
//           <input
//             type="date"
//             name="fromDate"
//             value={filters.fromDate}
//             onChange={handleChange}
//             className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none"
//           />
//         </div>

//         <div>
//           <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-400">
//             To
//           </label>
//           <input
//             type="date"
//             name="toDate"
//             value={filters.toDate}
//             onChange={handleChange}
//             className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none"
//           />
//         </div>

//         <div>
//           <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-400">
//             Sort By
//           </label>
//           <select
//             name="sortBy"
//             value={filters.sortBy}
//             onChange={handleChange}
//             className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none"
//           >
//             <option value="startTime">Start Time</option>
//             <option value="createdAt">Created At</option>
//             <option value="duration">Duration</option>
//             <option value="caloriesBurned">Calories Burned</option>
//           </select>
//         </div>

//         <div>
//           <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-400">
//             Order
//           </label>
//           <select
//             name="sortDir"
//             value={filters.sortDir}
//             onChange={handleChange}
//             className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none"
//           >
//             <option value="desc">Descending</option>
//             <option value="asc">Ascending</option>
//           </select>
//         </div>

//         <div>
//           <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-400">
//             Size
//           </label>
//           <select
//             name="size"
//             value={filters.size}
//             onChange={handleChange}
//             className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none"
//           >
//             <option value="5">5</option>
//             <option value="10">10</option>
//             <option value="20">20</option>
//           </select>
//         </div>

//         <div className="md:col-span-6 flex gap-3">
//           <button
//             type="submit"
//             className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
//           >
//             Apply Filters
//           </button>

//           <button
//             type="button"
//             onClick={handleReset}
//             className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
//           >
//             Reset
//           </button>
//         </div>
//       </form>

//       <div className="mb-4 flex items-center justify-between text-sm text-slate-400">
//         <p>Total Records: {totalElements}</p>
//         <p>
//           Page {totalPages === 0 ? 0 : currentPage + 1} of {totalPages}
//         </p>
//       </div>

//       {isLoading && (
//         <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-slate-300">
//           Loading history...
//         </div>
//       )}

//       {isError && (
//         <div className="rounded-2xl border border-red-800 bg-red-950/40 p-6 text-red-300">
//           Failed to load history.
//         </div>
//       )}

//       {!isLoading && !isError && activities.length === 0 && (
//         <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-slate-400">
//           No history found for the selected filters.
//         </div>
//       )}

//       {!isLoading && !isError && activities.length > 0 && (
//         <>
//           <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900">
//             <table className="min-w-full text-left text-sm text-slate-300">
//               <thead className="border-b border-slate-800 bg-slate-950/50 text-slate-400">
//                 <tr>
//                   <th className="px-6 py-4">Type</th>
//                   <th className="px-6 py-4">Duration</th>
//                   <th className="px-6 py-4">Calories</th>
//                   <th className="px-6 py-4">Start Time</th>
//                   <th className="px-6 py-4">Created At</th>
//                   <th className="px-6 py-4">Metrics</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {activities.map((activity) => (
//                   <tr
//                     key={activity.id}
//                     className="border-b border-slate-800 last:border-0 align-top"
//                   >
//                     <td className="px-6 py-4 font-medium text-white">
//                       {formatActivityType(activity.type)}
//                     </td>
//                     <td className="px-6 py-4">{activity.duration} min</td>
//                     <td className="px-6 py-4">{activity.caloriesBurned}</td>
//                     <td className="px-6 py-4">
//                       {activity.startTime ? new Date(activity.startTime).toLocaleString() : '-'}
//                     </td>
//                     <td className="px-6 py-4">
//                       {activity.createdAt ? new Date(activity.createdAt).toLocaleString() : '-'}
//                     </td>
//                     <td className="px-6 py-4 max-w-md">
//                       {renderMetrics(activity.additionalMetrics)}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <div className="mt-6 flex items-center justify-between">
//             <button
//               type="button"
//               onClick={handlePrevPage}
//               disabled={currentPage === 0}
//               className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
//             >
//               Previous
//             </button>

//             <span className="text-sm text-slate-400">
//               Page {totalPages === 0 ? 0 : currentPage + 1} of {totalPages}
//             </span>

//             <button
//               type="button"
//               onClick={handleNextPage}
//               disabled={isLast}
//               className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
//             >
//               Next
//             </button>
//           </div>
//         </>
//       )}
//     </DashboardLayout>
//   )
// }

// export default History



import { useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import { useGetActivityHistoryQuery } from '../features/activities/activityApi'

const ACTIVITY_TYPE_OPTIONS = [
  { value: 'RUNNING', label: 'Running' },
  { value: 'WALKING', label: 'Walking' },
  { value: 'CYCLING', label: 'Cycling' },
  { value: 'WEIGHT_TRAINING', label: 'Weight Training' },
  { value: 'CARDIO', label: 'Cardio' },
  { value: 'SWIMMING', label: 'Swimming' },
  { value: 'HIIT', label: 'HIIT' },
  { value: 'YOGA', label: 'Yoga' },
  { value: 'STRETCHING', label: 'Stretching' },
  { value: 'OTHER', label: 'Other' },
]

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

const formatActivityType = (value) => {
  if (!value) return '-'
  return value
    .toLowerCase()
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
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

const History = () => {
  const [filters, setFilters] = useState({
    type: '',
    fromDate: '',
    toDate: '',
    page: 0,
    size: 10,
    sortBy: 'startTime',
    sortDir: 'desc',
  })

  const { data, isLoading, isError, isFetching, refetch } = useGetActivityHistoryQuery(filters)

  const activities = data?.content || []
  const currentPage = data?.page || 0
  const totalPages = data?.totalPages || 0
  const totalElements = data?.totalElements || 0
  const isLast = data?.last ?? true

  const handleChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({
      ...prev,
      [name]: value,
      page: 0,
    }))
  }

  const handleSearch = (e) => {
    e.preventDefault()
    refetch()
  }

  const handleReset = () => {
    setFilters({
      type: '',
      fromDate: '',
      toDate: '',
      page: 0,
      size: 10,
      sortBy: 'startTime',
      sortDir: 'desc',
    })
  }

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setFilters((prev) => ({
        ...prev,
        page: prev.page - 1,
      }))
    }
  }

  const handleNextPage = () => {
    if (!isLast) {
      setFilters((prev) => ({
        ...prev,
        page: prev.page + 1,
      }))
    }
  }

  return (
    <DashboardLayout>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">History</h1>
          <p className="text-sm text-slate-400">Filter and browse your past activity records</p>
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

      <form
        onSubmit={handleSearch}
        className="mb-6 grid gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-4 md:grid-cols-6"
      >
        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-400">
            Type
          </label>
          <select
            name="type"
            value={filters.type}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none"
          >
            <option value="">All</option>
            {ACTIVITY_TYPE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-400">
            From
          </label>
          <input
            type="date"
            name="fromDate"
            value={filters.fromDate}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-400">
            To
          </label>
          <input
            type="date"
            name="toDate"
            value={filters.toDate}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-400">
            Sort By
          </label>
          <select
            name="sortBy"
            value={filters.sortBy}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none"
          >
            <option value="startTime">Start Time</option>
            <option value="createdAt">Created At</option>
            <option value="duration">Duration</option>
            <option value="caloriesBurned">Calories Burned</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-400">
            Order
          </label>
          <select
            name="sortDir"
            value={filters.sortDir}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-400">
            Size
          </label>
          <select
            name="size"
            value={filters.size}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>

        <div className="flex gap-3 md:col-span-6">
          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Apply Filters
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
          >
            Reset
          </button>
        </div>
      </form>

      <div className="mb-4 flex items-center justify-between text-sm text-slate-400">
        <p>Total Records: {totalElements}</p>
        <p>
          Page {totalPages === 0 ? 0 : currentPage + 1} of {totalPages}
        </p>
      </div>

      {isLoading && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-slate-300">
          Loading history...
        </div>
      )}

      {isError && (
        <div className="rounded-2xl border border-red-800 bg-red-950/40 p-6 text-red-300">
          Failed to load history.
        </div>
      )}

      {!isLoading && !isError && activities.length === 0 && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-slate-400">
          No history found for the selected filters.
        </div>
      )}

      {!isLoading && !isError && activities.length > 0 && (
        <>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-sm"
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                      Activity Type
                    </p>
                    <h3 className="mt-1 text-lg font-semibold text-white">
                      {formatActivityType(activity.type)}
                    </h3>
                  </div>

                  <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300">
                    {activity.caloriesBurned} cal
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                    <p className="text-xs uppercase tracking-wide text-slate-500">Duration</p>
                    <p className="mt-1 text-sm font-semibold text-white">
                      {activity.duration} min
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                    <p className="text-xs uppercase tracking-wide text-slate-500">Calories</p>
                    <p className="mt-1 text-sm font-semibold text-white">
                      {activity.caloriesBurned}
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-500">Start Time</p>
                    <p className="mt-1 text-sm text-slate-200">
                      {activity.startTime ? new Date(activity.startTime).toLocaleString() : '-'}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-500">Created At</p>
                    <p className="mt-1 text-sm text-slate-200">
                      {activity.createdAt ? new Date(activity.createdAt).toLocaleString() : '-'}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-500">Metrics</p>
                    <div className="mt-2">{renderMetrics(activity.additionalMetrics)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <button
              type="button"
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>

            <span className="text-sm text-slate-400">
              Page {totalPages === 0 ? 0 : currentPage + 1} of {totalPages}
            </span>

            <button
              type="button"
              onClick={handleNextPage}
              disabled={isLast}
              className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </DashboardLayout>
  )
}

export default History