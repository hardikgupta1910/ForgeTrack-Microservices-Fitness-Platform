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
      query: () => '/api/activities/all',
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
} = activityApi