import { Outlet, Link } from 'react-router-dom';
import './App.css'

export default function App(){
  return (
    <div className="min-h-screen">
      <header className="bg-white shadow">
        <div className="max-w-4xl mx-auto p-4 flex justify-between">
          <Link to="/" className="text-xl font-bold">SmartPayments</Link>
          <nav className="flex gap-4">
            <Link to="/" className="text-sm">Plans</Link>
            <Link to="/admin" className="text-sm">Admin</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}
