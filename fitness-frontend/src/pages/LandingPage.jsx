



import { Link } from 'react-router-dom'
import {
  Brain,
  Activity,
  BarChart3,
  ShieldCheck,
  Sparkles,
  Menu,
  X,
  ArrowRight,
} from 'lucide-react'
import { useState } from 'react'

const capabilities = [
  {
    title: 'Activity Tracking',
    description:
      'Log workouts, calories, steps, and training sessions in one structured system.',
    icon: Activity,
  },
  {
    title: 'AI Insights',
    description:
      'Turn raw fitness data into useful recommendations instead of staring at numbers.',
    icon: Brain,
  },
  {
    title: 'Progress Analytics',
    description:
      'Track trends, consistency, and performance through a clear visual dashboard.',
    icon: BarChart3,
  },
  {
    title: 'Recovery Guidance',
    description:
      'Use activity history and patterns to understand when to push and when to recover.',
    icon: ShieldCheck,
  },
]

const LandingPage = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#090d12] text-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 md:px-6">
          <Link to="/" className="flex items-center gap-3">
            <div className="text-xl font-black uppercase tracking-wider">
              Forge<span className="text-cyan-400">Track</span>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm text-white/80 hover:text-cyan-400">
              Features
            </a>
            <a href="#about" className="text-sm text-white/80 hover:text-cyan-400">
              About
            </a>
            <a href="#insights" className="text-sm text-white/80 hover:text-cyan-400">
              Insights
            </a>
            <a href="#contact" className="text-sm text-white/80 hover:text-cyan-400">
              Contact
            </a>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              to="/login"
              className="rounded-full border border-white/25 px-5 py-2.5 text-sm font-medium text-white hover:border-cyan-400 hover:text-cyan-400"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="rounded-full bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-black hover:bg-cyan-300"
            >
              Join Now
            </Link>
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 md:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {menuOpen && (
          <div className="mx-4 rounded-2xl border border-white/10 bg-[#0f141b]/95 p-4 backdrop-blur md:hidden">
            <div className="flex flex-col gap-3">
              <a href="#features" className="text-sm text-white/80">Features</a>
              <a href="#about" className="text-sm text-white/80">About</a>
              <a href="#insights" className="text-sm text-white/80">Insights</a>
              <a href="#contact" className="text-sm text-white/80">Contact</a>
              <Link to="/login" className="text-sm text-white/80">Login</Link>
              <Link
                to="/register"
                className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-4 py-3 text-sm font-semibold text-black"
              >
                Join Now
              </Link>
            </div>
          </div>
        )}
      </header>

      <main>
        <section className="relative min-h-screen overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1600&q=80')",
            }}
          />
          <div className="absolute inset-0 bg-black/70" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.45),rgba(9,13,18,0.92))]" />

          <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-4 text-center md:px-6">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">
              <Sparkles className="h-3.5 w-3.5" />
              AI Fitness Tracker
            </div>

            <h1 className="max-w-5xl text-5xl font-black uppercase leading-none tracking-tight md:text-7xl lg:text-8xl">
              Track <span className="text-cyan-400">Smarter.</span> <br />
              Improve with <span className="text-cyan-400">AI.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/75 md:text-base">
              Stop guessing your progress. ForgeTrack helps you log workouts, monitor
              performance, and get AI-powered insights from your real fitness data.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/register"
                className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-8 py-3.5 text-sm font-bold text-black hover:bg-cyan-300"
              >
                Start Tracking
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-full border border-white px-8 py-3.5 text-sm font-semibold text-white hover:border-cyan-400 hover:text-cyan-400"
              >
                View Dashboard
              </Link>
            </div>
          </div>
        </section>

        <section id="about" className="bg-[#090d12] px-4 py-20 md:px-6">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="overflow-hidden rounded-[28px] border border-cyan-400/20 bg-[#101720] p-2 shadow-[0_0_30px_rgba(34,211,238,0.08)]">
              <img
                src="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80"
                alt="Fitness tracking interface inspiration"
                className="h-full w-full rounded-[22px] object-cover"
              />
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-400">
                About the Product
              </p>
              <h2 className="mt-4 text-4xl font-black uppercase leading-tight md:text-5xl">
                The Future of <span className="text-cyan-400">Fitness Tracking</span>
              </h2>
              <p className="mt-6 max-w-2xl text-sm leading-8 text-white/75 md:text-base">
                ForgeTrack is not a gym membership page and not another motivational
                wrapper around empty charts. It is an AI fitness tracker built to help
                users record activity, understand progress, and make better decisions
                from actual data.
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-8 text-white/75 md:text-base">
                Instead of pushing generic workout hype, the platform focuses on useful
                tracking, clear trends, and intelligent recommendations based on what
                you have actually done.
              </p>

              <Link
                to="/register"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-cyan-400 px-6 py-3 text-sm font-bold text-black hover:bg-cyan-300"
              >
                Explore the Platform
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section id="features" className="bg-[#1c2430] px-4 py-20 md:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-400">
                Core Features
              </p>
              <h2 className="mt-4 text-4xl font-black uppercase md:text-5xl">
                AI Fitness Tracking <span className="text-cyan-400">Capabilities</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/70 md:text-base">
                Built to help users log activity, understand progress, and act on better insights.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {capabilities.map((item) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.title}
                    className="rounded-[22px] border border-white/10 bg-[#2b3442] p-6 transition hover:border-cyan-400/40 hover:-translate-y-1"
                  >
                    <div className="mb-5 inline-flex rounded-xl border border-cyan-400/30 bg-[#1a222d] p-3 text-cyan-400">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold text-white">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-white/70">
                      {item.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section id="insights" className="bg-[#090d12] px-4 py-20 md:px-6">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
            <div className="rounded-[28px] border border-white/10 bg-[#111821] p-6 lg:col-span-2">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-400">
                Smart Insights
              </p>
              <h2 className="mt-4 text-3xl font-black uppercase md:text-4xl">
                Data In. <span className="text-cyan-400">Direction Out.</span>
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-8 text-white/75 md:text-base">
                Track activity over time, compare output across weeks, and let the system
                suggest when to push harder, when to recover, and where consistency is breaking.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-[#0b1118] p-5">
                  <p className="text-xs uppercase tracking-[0.16em] text-white/45">
                    Activities
                  </p>
                  <p className="mt-2 text-3xl font-black text-white">148</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-[#0b1118] p-5">
                  <p className="text-xs uppercase tracking-[0.16em] text-white/45">
                    Hours Logged
                  </p>
                  <p className="mt-2 text-3xl font-black text-white">214</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-[#0b1118] p-5">
                  <p className="text-xs uppercase tracking-[0.16em] text-white/45">
                    Consistency
                  </p>
                  <p className="mt-2 text-3xl font-black text-white">87%</p>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-cyan-400/20 bg-cyan-400/10 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">
                Ready to Start
              </p>
              <h3 className="mt-4 text-3xl font-black uppercase text-white">
                Track Better From Day One
              </h3>
              <p className="mt-4 text-sm leading-8 text-white/85">
                Create your account, log your first activity, and start using AI-backed
                fitness guidance instead of relying on memory.
              </p>

              <Link
                to="/register"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-black hover:bg-slate-100"
              >
                Create Account
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <footer id="contact" className="border-t border-white/10 bg-[#090d12]">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 md:flex-row md:items-center md:justify-between md:px-6">
            <div>
              <p className="text-xl font-black uppercase">
                Forge<span className="text-cyan-400">Track</span>
              </p>
              <p className="mt-2 text-sm text-white/50">
                AI fitness tracking without the gym-marketing nonsense.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-white/65">
              <Link to="/login" className="hover:text-cyan-400">Login</Link>
              <Link to="/register" className="hover:text-cyan-400">Register</Link>
              <a href="#features" className="hover:text-cyan-400">Features</a>
              <a href="#about" className="hover:text-cyan-400">About</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}

export default LandingPage