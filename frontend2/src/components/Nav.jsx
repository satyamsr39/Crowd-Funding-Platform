import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Nav() {
  const location = useLocation()
  const isActive = (path) => location.pathname === path

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between h-16 items-center">
          {/* Logo and Nav */}
          <div className="flex items-center space-x-10">
            <Link
              to="/"
              className="text-2xl font-bold text-gray-900 hover:text-indigo-600 transition"
            >
              Charity
            </Link>
            <nav className="flex space-x-6">
              <Link
                to="/ngos"
                className={`text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-md font-medium transition ${
                  isActive('/ngos') ? 'text-indigo-600 font-semibold bg-indigo-50' : ''
                }`}
              >
                NGOs
              </Link>
              <Link
                to="/add"
                className={`text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-md font-medium transition ${
                  isActive('/add') ? 'text-indigo-600 font-semibold bg-indigo-50' : ''
                }`}
              >
                Add NGO
              </Link>
            </nav>
          </div>

          {/* Admin */}
          <div>
            <Link
              to="/admin/login"
              className="text-gray-700 hover:text-indigo-600 border border-gray-300 px-4 py-2 rounded-md text-md font-medium transition hover:border-indigo-600"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
