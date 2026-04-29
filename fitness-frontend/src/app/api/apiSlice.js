import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8084',
    prepareHeaders: (headers, { getState }) => {
      const { token, user } = getState().auth

      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }

      if (user?.userId) {
        headers.set('X-User-Id', user.userId)
      }

      if (user?.role) {
        headers.set('X-User-Role', user.role)
      }

      return headers
    },
  }),
  tagTypes: ['User', 'Activity', 'Recommendation'],
  endpoints: () => ({}),
})