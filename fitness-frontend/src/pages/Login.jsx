


import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useLoginUserMutation } from '../features/auth/authApi'
import { ArrowLeft, ArrowRight, Dumbbell } from 'lucide-react'

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [submitError, setSubmitError] = useState('')
  const [loginUser, { isLoading, error }] = useLoginUserMutation()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (submitError) setSubmitError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError('')

    try {
      await loginUser(formData).unwrap()
      navigate('/dashboard')
    } catch (err) {
      setSubmitError(
        err?.data?.message || 'Invalid email or password. Check your credentials.'
      )
      console.error('Login failed:', err)
    }
  }

  const displayedError =
    submitError || (error ? 'Invalid email or password. Check your credentials.' : '')

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="grid min-h-screen lg:grid-cols-2">
        <div className="hidden border-r border-white/10 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.18),transparent_35%),#020617] lg:flex lg:flex-col lg:justify-between lg:p-12">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-400/10">
              <Dumbbell className="h-5 w-5 text-cyan-300" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Fitness</p>
              <p className="text-lg font-semibold text-white">ForgeTrack</p>
            </div>
          </div>

          <div className="max-w-xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300">
              Performance dashboard
            </p>
            <h1 className="mt-4 text-5xl font-semibold leading-tight tracking-tight text-white">
              Log training.
              <span className="block text-slate-400">Track progress.</span>
              <span className="block">Cut the excuses.</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              One system for workouts, activity history, recommendations, and real
              accountability.
            </p>
          </div>

          <div className="grid max-w-xl grid-cols-3 gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-2xl font-semibold text-white">10k+</p>
              <p className="mt-1 text-sm text-slate-400">Logs tracked</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-2xl font-semibold text-white">87%</p>
              <p className="mt-1 text-sm text-slate-400">Adherence rate</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-2xl font-semibold text-white">24/7</p>
              <p className="mt-1 text-sm text-slate-400">Access anywhere</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center px-4 py-10 sm:px-6">
          <div className="w-full max-w-md">
            <Link
              to="/"
              className="mb-6 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>

            <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-black/30 backdrop-blur-xl">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300">
                  Welcome back
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
                  Login to your account
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Access your dashboard, activity history, and recommendations.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-slate-200">
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    aria-invalid={displayedError ? 'true' : 'false'}
                    aria-describedby={displayedError ? 'login-error' : undefined}
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium text-slate-200">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    aria-invalid={displayedError ? 'true' : 'false'}
                    aria-describedby={displayedError ? 'login-error' : undefined}
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
                    required
                  />
                </div>

                {displayedError && (
                  <p id="login-error" role="alert" className="text-sm text-red-400">
                    {displayedError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isLoading ? 'Logging in...' : 'Login'}
                  {!isLoading && <ArrowRight className="h-4 w-4" />}
                </button>
              </form>

              <p className="mt-6 text-sm text-slate-400">
                Don&apos;t have an account?{' '}
                <Link to="/register" className="font-medium text-cyan-300 hover:text-cyan-200">
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login