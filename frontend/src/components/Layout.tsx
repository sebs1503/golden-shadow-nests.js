import { NavLink, Outlet } from 'react-router-dom'

export default function Layout() {
  const link = 'px-3 py-2 rounded-lg hover:bg-zinc-100 transition';
  const active = 'bg-zinc-900 text-white hover:bg-zinc-900';
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-white">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
          <div className="font-bold text-xl">🔶 Golden Shadows</div>
          <nav className="flex gap-2">
            <NavLink to="/" end className={({isActive})=> isActive? `${link} ${active}`:link}>Dashboard</NavLink>
            <NavLink to="/cases" className={({isActive})=> isActive? `${link} ${active}`:link}>Cases</NavLink>
            <NavLink to="/victims" className={({isActive})=> isActive? `${link} ${active}`:link}>Victims</NavLink>
            <NavLink to="/families" className={({isActive})=> isActive? `${link} ${active}`:link}>Families</NavLink>
            <NavLink to="/methods" className={({isActive})=> isActive? `${link} ${active}`:link}>Methods</NavLink>
          </nav>
          <div className="ml-auto text-sm text-zinc-500">API: {import.meta.env.VITE_API_URL || 'http://localhost:3000'}</div>
        </div>
      </header>
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
