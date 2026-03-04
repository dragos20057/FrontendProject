import { Link } from 'react-router-dom'
import { useAuthStore } from '@/features/auth/model/auth.store'

export default function Sidebar() {
  const { user } = useAuthStore()

  return (
    <aside
      style={{
        width: 200,
        background: '#222',
        color: 'white',
        padding: '1rem',
      }}
    >
      {user?.role === 'admin' && (
        <div>
          <Link to="/admin">Admin Dashboard</Link>
        </div>
      )}

      {user?.role === 'client' && (
        <div>
          <Link to="/client">Client Dashboard</Link>
        </div>
      )}
    </aside>
  )
}