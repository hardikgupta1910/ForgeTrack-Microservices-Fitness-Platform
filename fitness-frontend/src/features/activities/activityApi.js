


// import { apiSlice } from '../../app/api/apiSlice'

// export const activityApi = apiSlice.injectEndpoints({
//   endpoints: (build) => ({
//     getMyActivities: build.query({
//       query: (userId) => `/api/activities/user/${userId}`,
//       providesTags: ['Activity'],
//     }),

//     createActivity: build.mutation({
//       query: (data) => ({
//         url: '/api/activities',
//         method: 'POST',
//         body: data,
//       }),
//       invalidatesTags: ['Activity'],
//     }),

//     updateActivity: build.mutation({
//       query: ({ id, ...data }) => ({
//         url: `/api/activities/${id}`,
//         method: 'PUT',
//         body: data,
//       }),
//       invalidatesTags: ['Activity'],
//     }),

//     deleteActivity: build.mutation({
//       query: (id) => ({
//         url: `/api/activities/${id}`,
//         method: 'DELETE',
//       }),
//       invalidatesTags: ['Activity'],
//     }),

//     getAllActivities: build.query({
//       query: ({ page = 0, size = 10 } = {}) =>
//         `/api/activities/all?page=${page}&size=${size}`,
//       providesTags: ['Activity'],
//     }),
//   }),
//   overrideExisting: false,
// })

// export const {
//   useGetMyActivitiesQuery,
//   useCreateActivityMutation,
//   useUpdateActivityMutation,
//   useDeleteActivityMutation,
//   useGetAllActivitiesQuery,
// } = activityApi



import { apiSlice } from '../../app/api/apiSlice'

export const activityApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getMyActivities: build.query({
      query: (userId) => `/api/activities/user/${userId}`,
      providesTags: ['Activity'],
    }),

    createActivity: build.mutation({
      query: (data) => ({
        url: '/api/activities',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Activity'],
    }),

    updateActivity: build.mutation({
      query: ({ id, ...data }) => ({
        url: `/api/activities/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Activity'],
    }),

    deleteActivity: build.mutation({
      query: (id) => ({
        url: `/api/activities/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Activity'],
    }),

    getAllActivities: build.query({
      query: ({ page = 0, size = 10 } = {}) =>
        `/api/activities/all?page=${page}&size=${size}`,
      providesTags: ['Activity'],
    }),

    getActivityHistory: build.query({
      query: ({
        type = '',
        fromDate = '',
        toDate = '',
        page = 0,
        size = 10,
        sortBy = 'startTime',
        sortDir = 'desc',
      } = {}) => {
        const params = new URLSearchParams()

        if (type) params.append('type', type)
        if (fromDate) params.append('fromDate', fromDate)
        if (toDate) params.append('toDate', toDate)
        params.append('page', page)
        params.append('size', size)
        params.append('sortBy', sortBy)
        params.append('sortDir', sortDir)

        return `/api/activities/history?${params.toString()}`
      },
      providesTags: ['Activity'],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetMyActivitiesQuery,
  useCreateActivityMutation,
  useUpdateActivityMutation,
  useDeleteActivityMutation,
  useGetAllActivitiesQuery,
  useGetActivityHistoryQuery,
} = activityApi