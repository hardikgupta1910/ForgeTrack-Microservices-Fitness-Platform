import { setCredentials } from './authSlice'
import { decodeJwt } from '../../utils/auth'
import { apiSlice } from '../../app/api/apiSlice'

export const authApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    loginUser: build.mutation({
      async queryFn(credentials) {
        try {
          const response = await fetch('http://localhost:8084/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
          })

          const token = await response.text()

          if (!response.ok) {
            return {
              error: {
                status: response.status,
                data: token,
              },
            }
          }

          return { data: token }
        } catch (error) {
          return {
            error: {
              status: 'FETCH_ERROR',
              data: error.message || 'Login request failed',
            },
          }
        }
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: token } = await queryFulfilled
          const user = decodeJwt(token)
          dispatch(setCredentials({ token, user }))
        } catch (error) {
          console.error('Login failed in onQueryStarted:', error)
        }
      },
    }),

    registerUser: build.mutation({
      query: (data) => ({
        url: '/api/users/register',
        method: 'POST',
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
})

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
} = authApi