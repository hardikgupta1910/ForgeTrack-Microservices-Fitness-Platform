import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice'
import {
  ChevronLeft,
  LayoutDashboard,
  ClipboardList,
  PlusCircle,
  Sparkles,
  Bot,
  User,
  Users,
  LogOut,
} from 'lucide-react'

const Sidebar = () => {
  const user = useSelector((state) => state.auth.user)
  const dispatch = useDispatch()
  const [collapsed, setCollapsed] = useState(false)

  const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/activities', label: 'Activities', icon: ClipboardList, end: true },
  { to: '/activities/new', label: 'Add Activity', icon: PlusCircle },
  { to: '/recommendations', label: 'Recommendations', icon: Sparkles },
  { to: '/ai-chat', label: 'AI Chat', icon: Bot },
  { to: '/profile', label: 'Profile', icon: User },
]

  if (user?.role === 'ROLE_ADMIN') {
    navItems.push({ to: '/admin/users', label: 'Admin Users', icon: Users })
  }

  const navLinkClass = ({ isActive }) =>
    `flex items-center rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
      collapsed ? 'justify-center' : 'gap-3'
    } whitespace-nowrap ${
      isActive
        ? 'bg-blue-600 text-white'
        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
    }`

  return (
    <aside
      className={`flex min-h-screen flex-col border-r border-slate-800 bg-slate-950 transition-all duration-300 ${
        collapsed ? 'w-20 min-w-20' : 'w-64 min-w-64'
      }`}
    >
      <div className="border-b border-slate-800 px-4 py-4">
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-slate-900 text-white transition hover:bg-slate-800"
        >
          <ChevronLeft
            size={18}
            className={`transition-transform duration-300 ${
              collapsed ? 'rotate-180' : ''
            }`}
          />
        </button>

        {!collapsed && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
            <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
              Logged in as
            </p>
            <p className="mt-2 truncate text-sm font-semibold text-white">
              {user?.sub || 'No email'}
            </p>
            <p className="mt-1 text-xs font-medium text-blue-400">
              {user?.role || 'No role'}
            </p>
          </div>
        )}
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const Icon = item.icon

          return (
<NavLink key={item.to} to={item.to} end={item.end} className={navLinkClass}>              
              <Icon size={18} className="shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          )
        })}
      </nav>

      <div className="border-t border-slate-800 p-4">
        <button
          onClick={() => dispatch(logout())}
          className={`flex items-center justify-center rounded-xl bg-red-600 py-3 text-sm font-semibold text-white transition hover:bg-red-700 ${
            collapsed ? 'w-12 px-0' : 'w-full gap-2 px-4'
          }`}
        >
          <LogOut size={18} className="shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  )
}

export default Sidebar