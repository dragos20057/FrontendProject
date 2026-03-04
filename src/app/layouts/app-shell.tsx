import { Outlet } from 'react-router-dom'
import Header from '@/widgets/header/header'
import Sidebar from '@/widgets/sidebar/sidebar'

export default function AppShell() {
  return (
    <div>
      <Header />

      <div style={{ display: 'flex' }}>
        <Sidebar />

        <main style={{ padding: '1rem', flex: 1 }}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}