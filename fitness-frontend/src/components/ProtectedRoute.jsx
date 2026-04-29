import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function ProtectedRoute({ children, adminOnly = false }) {
  const user = useSelector((state) => state.auth.user)

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (adminOnly && user.role !== 'ROLE_ADMIN') {
    return <Navigate to="/dashboard" replace />
  }

  return children
}

export default ProtectedRoute