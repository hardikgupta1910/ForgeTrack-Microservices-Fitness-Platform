import { useSelector } from 'react-redux'

const Topbar = () => {
  const user = useSelector((state) => state.auth.user)

  return (
    <header className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-6 py-4">
      <div>
        <h2 className="text-2xl font-bold text-white">Dashboard</h2>
        <p className="text-sm text-slate-400">
          Track activities, AI insights, and account overview
        </p>
      </div>

      <div className="rounded-full border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-300">
        {user?.role === 'ROLE_ADMIN' ? 'Admin Panel' : 'User Panel'}
      </div>
    </header>
  )
}

export default Topbar