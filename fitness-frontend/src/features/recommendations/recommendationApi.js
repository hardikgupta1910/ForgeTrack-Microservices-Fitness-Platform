import { apiSlice } from '../../app/api/apiSlice'

export const recommendationApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getRecommendationsByUser: build.query({
      query: (userId) => `/api/recommendations/user/${userId}`,
      providesTags: ['Recommendation'],
    }),

    getRecommendationsByActivity: build.query({
      query: (activityId) => `/api/recommendations/activity/${activityId}`,
      providesTags: ['Recommendation'],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetRecommendationsByUserQuery,
  useGetRecommendationsByActivityQuery,
} = recommendationApi