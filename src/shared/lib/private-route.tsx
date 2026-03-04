import { Navigate } from 'react-router-dom'
import { ReactNode } from 'react'
import { useAuthStore } from '@/features/auth/model/auth.store'

interface RoleRouteProps {
  children: ReactNode
  allowedRoles: ('admin' | 'client')[]
}

export const RoleRoute = ({
  children,
  allowedRoles,
}: RoleRouteProps) => {
  const { user, isAuthenticated } = useAuthStore()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/forbidden" replace />
  }

  return <>{children}</>
}