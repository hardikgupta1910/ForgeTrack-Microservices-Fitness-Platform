// import { Routes, Route, Navigate } from 'react-router-dom'
// import ProtectedRoute from './components/ProtectedRoute'
// import Login from './pages/Login'
// import Register from './pages/Register'
// import Dashboard from './pages/Dashboard'
// import Activities from './pages/Activities'
// import AddActivity from './pages/AddActivity'
// import Recommendations from './pages/Recommendations'
// import AIChat from './pages/AIChat'
// import Profile from './pages/Profile'
// import AdminUsers from './pages/AdminUsers'

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Navigate to="/dashboard" replace />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />

//       <Route
//         path="/dashboard"
//         element={
//           <ProtectedRoute>
//             <Dashboard />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/activities"
//         element={
//           <ProtectedRoute>
//             <Activities />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/activities/new"
//         element={
//           <ProtectedRoute>
//             <AddActivity />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/recommendations"
//         element={
//           <ProtectedRoute>
//             <Recommendations />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/ai-chat"
//         element={
//           <ProtectedRoute>
//             <AIChat />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/profile"
//         element={
//           <ProtectedRoute>
//             <Profile />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/admin/users"
//         element={
//           <ProtectedRoute adminOnly={true}>
//             <AdminUsers />
//           </ProtectedRoute>
//         }
//       />
//     </Routes>
//   )
// }

// export default App


import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Activities from './pages/Activities'
import AddActivity from './pages/AddActivity'
import Recommendations from './pages/Recommendations'
import AIChat from './pages/AIChat'
import Profile from './pages/Profile'
import AdminUsers from './pages/AdminUsers'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/activities"
        element={
          <ProtectedRoute>
            <Activities />
          </ProtectedRoute>
        }
      />
      <Route
        path="/activities/new"
        element={
          <ProtectedRoute>
            <AddActivity />
          </ProtectedRoute>
        }
      />
      <Route
        path="/recommendations"
        element={
          <ProtectedRoute>
            <Recommendations />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ai-chat"
        element={
          <ProtectedRoute>
            <AIChat />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute adminOnly={true}>
            <AdminUsers />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default App