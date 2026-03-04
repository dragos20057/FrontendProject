import { Navigate, useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useAuth } from '@/app/providers/auth-provider'

type RoleRouteProps = {
  children: ReactNode
  allowedRoles?: Array<'admin' | 'user'>
}

export const RoleRoute = ({
  children,
  allowedRoles,
}: RoleRouteProps) => {
  const { user, isLoading } = useAuth()
  const location = useLocation()

  // ⏳ ждём загрузку
  if (isLoading) {
    return <div>Loading...</div>
  }

  // 🔒 не авторизован
  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    )
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/forbidden" replace />
  }

  return <>{children}</>
}

export default RoleRoute