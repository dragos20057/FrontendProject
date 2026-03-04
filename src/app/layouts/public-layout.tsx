import { Outlet } from 'react-router-dom'

export default function PublicLayout() {
  return (
    <div style={{ padding: '2rem' }}>
      <Outlet />
    </div>
  )
}