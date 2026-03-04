import { useAuthStore } from '@/features/auth/model/auth.store'

export default function Header() {
  const { user, logout } = useAuthStore()

  return (
    <header
      style={{
        padding: '1rem',
        background: '#111',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <div>MyApp</div>

      {user && (
        <div>
          {user.email} ({user.role})
          <button onClick={logout} style={{ marginLeft: 10 }}>
            Logout
          </button>
        </div>
      )}
    </header>
  )
}