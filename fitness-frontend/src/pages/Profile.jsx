import { useState } from 'react'
import { useSelector } from 'react-redux'
import DashboardLayout from '../components/DashboardLayout'
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from '../features/users/userApi'

const Profile = () => {
  const authUser = useSelector((state) => state.auth.user)

  const {
    data: profile,
    isLoading,
    isError,
  } = useGetUserByIdQuery(authUser?.userId, {
    skip: !authUser?.userId,
  })

  const [updateUser, { isLoading: updating, error: updateError }] =
    useUpdateUserMutation()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await updateUser({
        id: authUser.userId,
        firstName: formData.firstName || profile?.firstName || '',
        lastName: formData.lastName || profile?.lastName || '',
      }).unwrap()
    } catch (err) {
      console.error('Profile update failed:', err)
    }
  }


//   const formatDateTime = (value) => {
//   if (!value) return '-'

//   return new Date(value).toLocaleString('en-IN', {
//     dateStyle: 'medium',
//     timeStyle: 'short',
//     timeZone: 'Asia/Kolkata',
//   })
// }


  return (
    <DashboardLayout>
      <div className="grid gap-6 lg:grid-cols-3">
        {/* <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 lg:col-span-1">
          <h1 className="text-2xl font-bold text-white">Profile</h1>
          <p className="mt-2 text-sm text-slate-400">
            View and update your account information
          </p>

          {isLoading && (
            <p className="mt-6 text-slate-300">Loading profile...</p>
          )}

          {isError && (
            <p className="mt-6 text-red-400">Failed to load profile.</p>
          )}

          {profile && (
            <div className="mt-6 space-y-3 text-sm text-slate-300">
              <p>
                <span className="text-slate-500">Email:</span> {profile.email}
              </p>
              <p>
                <span className="text-slate-500">Role:</span> {profile.role}
              </p>
              <p>
                <span className="text-slate-500">Created:</span>{' '}
                {profile.createdAt
                  ? new Date(profile.createdAt).toLocaleString()
                  : '-'}
              </p>
              <p>
                <span className="text-slate-500">Updated:</span>{' '}
                {profile.updatedAt
                  ? new Date(profile.updatedAt).toLocaleString()
                  : '-'}
              </p>
            </div>
          )}
        </div> */}

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 lg:col-span-1">
  <h1 className="text-2xl font-bold text-white">Profile</h1>
  <p className="mt-2 text-sm text-slate-400">
    View and update your account information
  </p>

  {isLoading && <p className="mt-6 text-slate-300">Loading profile...</p>}

  {isError && <p className="mt-6 text-red-400">Failed to load profile.</p>}

  {profile && (
    <div className="mt-6 space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
          Profile Overview
        </p>
        <div className="mt-3 space-y-3 text-sm text-slate-300">
          <p><span className="text-slate-500">Name:</span> {profile.firstName} {profile.lastName}</p>
          <p><span className="text-slate-500">Email:</span> {profile.email}</p>
          <p><span className="text-slate-500">Role:</span> {profile.role}</p>
          <p className="break-all"><span className="text-slate-500">User ID:</span> {profile.userId}</p>
        </div>
      </div>

      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
          Account Details
        </p>
        <div className="mt-3 space-y-3 text-sm text-slate-300">
          <p><span className="text-slate-500">Created:</span> {profile.createdAt ? new Date(profile.createdAt).toLocaleString() : '-'}</p>
          <p><span className="text-slate-500">Updated:</span> {profile.updatedAt ? new Date(profile.updatedAt).toLocaleString() : '-'}</p>
          <p><span className="text-slate-500">Status:</span> Active</p>
          <p><span className="text-slate-500">Timezone:</span> Asia/Kolkata</p>
        </div>
      </div>

        {/* <div>
  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
    Account Details
  </p>
  <div className="mt-3 space-y-3 text-sm text-slate-300">
    <p>
      <span className="text-slate-500">Created:</span> {formatDateTime(profile.createdAt)}
    </p>
    <p>
      <span className="text-slate-500">Updated:</span> {formatDateTime(profile.updatedAt)}
    </p>
    <p>
      <span className="text-slate-500">Status:</span> Active
    </p>
    <p>
      <span className="text-slate-500">Timezone:</span> Asia/Kolkata
    </p>
  </div>
</div> */}



      {/* <div>
        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
          Fitness Summary
        </p>
        <div className="mt-3 space-y-3 text-sm text-slate-300">
          <p><span className="text-slate-500">Activities:</span> 2</p>
          <p><span className="text-slate-500">Calories:</span> 200</p>
          <p><span className="text-slate-500">Duration:</span> 30 min</p>
          <p><span className="text-slate-500">Favorite:</span> Running</p>
        </div>
      </div> */}
    </div>
  )}
</div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 lg:col-span-2">
          <h2 className="text-xl font-semibold text-white">Edit Profile</h2>
          <p className="mt-2 text-sm text-slate-400">
            Only first name and last name are editable from this screen.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-slate-300">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName || profile?.firstName || ''}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName || profile?.lastName || ''}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white"
              />
            </div>

            {updateError && (
              <p className="md:col-span-2 text-sm text-red-400">
                Failed to update profile.
              </p>
            )}

            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={updating || isLoading}
                className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {updating ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Profile