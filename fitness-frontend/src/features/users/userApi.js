import { apiSlice } from '../../app/api/apiSlice'

export const userApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getUserById: build.query({
      query: (userId) => `/api/users/${userId}`,
      providesTags: ['User'],
    }),

    updateUser: build.mutation({
      query: ({ id, ...data }) => ({
        url: `/api/users/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),

    getAllUsers: build.query({
      query: () => '/api/users/all',
      providesTags: ['User'],
    }),

    updateUserRole: build.mutation({
      query: ({ id, role }) => ({
        url: `/api/users/${id}/role?role=${role}`,
        method: 'PUT',
        responseHandler: (response) => response.text(),
      }),
      invalidatesTags: ['User'],
    }),

    deleteUser: build.mutation({
      query: (id) => ({
        url: `/api/users/${id}`,
        method: 'DELETE',
        responseHandler: (response) => response.text(),
      }),
      invalidatesTags: ['User'],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
} = userApi