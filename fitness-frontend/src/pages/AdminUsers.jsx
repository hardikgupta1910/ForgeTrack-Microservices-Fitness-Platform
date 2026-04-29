import { RefreshCw } from 'lucide-react'
import DashboardLayout from '../components/DashboardLayout'
import {
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
} from '../features/users/userApi'

const AdminUsers = () => {
  const {
    data: users = [],
    isLoading,
    error,
    refetch,
    isFetching,
  } = useGetAllUsersQuery()

  const [updateUserRole, { isLoading: isUpdatingRole }] = useUpdateUserRoleMutation()
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation()

  const handleToggleRole = async (user) => {
    try {
      const newRole = user.role === 'ROLE_ADMIN' ? 'ROLE_USER' : 'ROLE_ADMIN'
      await updateUserRole({ id: user.id, role: newRole }).unwrap()
      refetch()
    } catch (err) {
      console.error('Role update failed:', err)
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteUser(id).unwrap()
      refetch()
    } catch (err) {
      console.error('Delete failed:', err)
    }
  }

  return (
    <DashboardLayout>
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Admin Users</h1>
            <p className="mt-1 text-sm text-slate-400">
              Manage all registered users and roles.
            </p>
          </div>

          <button
            type="button"
            onClick={refetch}
            disabled={isFetching}
            title="Refresh users"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
            {isFetching ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>

        {isLoading ? (
          <p className="text-sm text-slate-400">Loading users...</p>
        ) : error ? (
          <p className="text-sm text-red-400">Failed to load users.</p>
        ) : users.length === 0 ? (
          <p className="text-sm text-slate-400">No users found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-800/60 text-slate-400">
                <tr>
                  <th className="px-4 py-3 font-medium">ID</th>
                  <th className="px-4 py-3 font-medium">Email</th>
                  <th className="px-4 py-3 font-medium">First Name</th>
                  <th className="px-4 py-3 font-medium">Last Name</th>
                  <th className="px-4 py-3 font-medium">Role</th>
                  <th className="px-4 py-3 font-medium">Created</th>
                  <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-t border-slate-800">
                    <td className="px-4 py-3 text-xs text-slate-400">{user.id}</td>
                    <td className="px-4 py-3">{user.email}</td>
                    <td className="px-4 py-3">{user.firstName}</td>
                    <td className="px-4 py-3">{user.lastName}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-violet-500/15 px-2.5 py-1 text-xs font-medium text-violet-300">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-400">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleString()
                        : 'N/A'}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleToggleRole(user)}
                          disabled={isUpdatingRole || isDeleting}
                          className="rounded-md bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                        >
                          Toggle Role
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(user.id)}
                          disabled={isUpdatingRole || isDeleting}
                          className="rounded-md bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700 disabled:opacity-50"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

export default AdminUsers