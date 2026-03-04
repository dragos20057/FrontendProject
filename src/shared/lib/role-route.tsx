import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/features/auth/model/auth.store'
import type { ReactNode } from 'react'

type UserRole = 'admin' | 'client'

interface RoleRouteProps {
  allowedRoles: UserRole[]
  children: ReactNode
}

export function RoleRoute({
  allowedRoles,
  children,
}: RoleRouteProps) {
  const { user, isAuthenticated } = useAuthStore()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/forbidden" replace />
  }

  return <>{children}</>
}