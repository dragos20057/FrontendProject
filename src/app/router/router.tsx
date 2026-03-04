// src/app/router/router.tsx
import { createBrowserRouter } from 'react-router-dom'
import { RoleRoute } from '@/shared/lib/role-route'
import AppShell from '@/app/layouts/app-shell'
import PublicLayout from '@/app/layouts/public-layout'
import AdminDashboard from '@/pages/dashboard/admin'
import ClientDashboard from '@/pages/dashboard/client'
import Forbidden from '@/pages/forbidden'
import Login from '@/pages/login'
import { HomePage } from '@/pages/home/HomePage'

export const router = createBrowserRouter([
  // Public routes
  {
    element: <PublicLayout />,
    children: [
      {
        path: '/login',
        element: <Login children={undefined} />,
      },
    ],
  },
  // Protected / main app routes
  {
    element: <AppShell />,
    children: [
      // 🔹 Главная заглушка
      {
        path: '/',
        element: <HomePage />,
      },
      // Admin dashboard
      {
        path: '/admin',
        element: (
          <RoleRoute allowedRoles={['admin']} children={<AdminDashboard />} />
        ),
      },
      // Client dashboard
      {
        path: '/client',
        element: (
          <RoleRoute allowedRoles={['client']} children={<ClientDashboard />} />
        ),
      },
      // Forbidden page
      {
        path: '/forbidden',
        element: <Forbidden />,
      },
    ],
  },
])