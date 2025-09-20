import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Nav() {
  const location = useLocation()
  const isActive = (path) => location.pathname === path
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)
  const btnRef = useRef(null)

  // Close on route change
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  // Close on Escape
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Close on outside click
  useEffect(() => {
    function onClick(e) {
      if (!open) return
      const m = menuRef.current
      const b = btnRef.current
      if (m && !m.contains(e.target) && b && !b.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [open])

  return (
    <header className="bg-gray-100 shadow-xl border-b border-gray-200 border-b-indigo-600">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between h-16 items-center">
          {/* Logo and Nav */}
          <div className="flex items-center space-x-10">
            <Link
              to="/"
              className="text-3xl font-bold text-gray-900 hover:text-indigo-600 transition"
            >
              Charity
            </Link>

            {/* Desktop nav (unchanged) */}
            <nav className="hidden md:flex space-x-6">
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

          {/* Admin (always visible) */}
          <div className="hidden sm:block">
            <Link
              to="/admin/login"
              className="text-gray-700 hover:text-indigo-600 border border-gray-300 px-4 py-2 rounded-md text-md font-medium transition hover:border-indigo-600"
            >
              Admin
            </Link>
          </div>

          {/* Mobile: admin + hamburger inline on the right */}
          <div className="flex items-center gap-2 md:hidden">
            <Link
              to="/admin/login"
              className="text-gray-700 hover:text-indigo-600 border border-gray-300 px-3 py-1.5 rounded-md text-sm font-medium transition hover:border-indigo-600"
            >
              Admin
            </Link>
            <button
              ref={btnRef}
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:text-indigo-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              aria-label="Open main menu"
              aria-haspopup="true"
              aria-controls="mobile-menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <svg
                className={`h-6 w-6 transition-transform ${open ? 'rotate-90' : ''}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {open ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className={`md:hidden transition-all duration-200 ease-out overflow-hidden ${open ? 'max-h-40 border-t border-gray-200' : 'max-h-0'}`}
      >
        <nav className="px-6 py-3 space-y-1 bg-white">
          <Link
            to="/ngos"
            className={`block text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-md font-medium transition ${
              isActive('/ngos') ? 'text-indigo-600 font-semibold bg-indigo-50' : ''
            }`}
          >
            NGOs
          </Link>
          <Link
            to="/add"
            className={`block text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-md font-medium transition ${
              isActive('/add') ? 'text-indigo-600 font-semibold bg-indigo-50' : ''
            }`}
          >
            Add NGO
          </Link>
        </nav>
      </div>
    </header>
  )
}

