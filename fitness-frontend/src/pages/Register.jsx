


import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useRegisterUserMutation } from '../features/auth/authApi'
import { ArrowLeft, ArrowRight, Dumbbell } from 'lucide-react'

const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })
  const [submitError, setSubmitError] = useState('')
  const [registerUser, { isLoading, error }] = useRegisterUserMutation()

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
      await registerUser(formData).unwrap()
      navigate('/login')
    } catch (err) {
      setSubmitError(err?.data?.message || 'Registration failed. Try different details.')
      console.error('Registration failed:', err)
    }
  }

  const displayedError =
    submitError || (error ? 'Registration failed. Try different details.' : '')

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
              Start strong
            </p>
            <h1 className="mt-4 text-5xl font-semibold leading-tight tracking-tight text-white">
              Build the habit.
              <span className="block text-slate-400">Track the effort.</span>
              <span className="block">See the truth.</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              Create your account and stop relying on memory, motivation spikes, and random notes.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-slate-400">What you get</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-200">
              <li>Clean activity logging</li>
              <li>Personalized recommendations</li>
              <li>Progress dashboard</li>
              <li>Role-based access</li>
            </ul>
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
                  Create account
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
                  Register for ForgeTrack
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Set up your account and start tracking with structure.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-slate-200"
                    >
                      First name
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      name="firstName"
                      autoComplete="given-name"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Hardik"
                      className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-slate-200"
                    >
                      Last name
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      name="lastName"
                      autoComplete="family-name"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Gupta"
                      className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
                      required
                    />
                  </div>
                </div>

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
                    aria-describedby={displayedError ? 'register-error' : undefined}
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
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a secure password"
                    aria-invalid={displayedError ? 'true' : 'false'}
                    aria-describedby={displayedError ? 'register-error' : undefined}
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
                    required
                  />
                </div>

                {displayedError && (
                  <p id="register-error" role="alert" className="text-sm text-red-400">
                    {displayedError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isLoading ? 'Creating account...' : 'Create account'}
                  {!isLoading && <ArrowRight className="h-4 w-4" />}
                </button>
              </form>

              <p className="mt-6 text-sm text-slate-400">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-cyan-300 hover:text-cyan-200">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register