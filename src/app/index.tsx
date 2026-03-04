import { useAuthBootstrap } from '@/features/auth/model/useAuthBootstrap'
import { RouterProvider } from 'react-router-dom'
import { router } from '@/app/router/router'
import { QueryProvider } from '@/app/providers/querty-provider'
import { ErrorBoundary } from '@/app/providers/error-boundary'


const AppContent = () => {
  useAuthBootstrap()

  return <RouterProvider router={router} />
}
export const App = () => {
  return (
    <ErrorBoundary>
      <QueryProvider>
        <AppContent />
      </QueryProvider>
    </ErrorBoundary>
  )
}