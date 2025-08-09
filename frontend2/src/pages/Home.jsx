import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div
      className="relative min-h-[90vh] flex items-center justify-center bg-cover bg-center overflow-y-0"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1485217988980-11786ced9454?auto=format&fit=crop&w=1470&q=80')",
      }}
    >
      {/* Subtle light overlay with low opacity */}
      <div className="absolute inset-0 bg-white bg-opacity-30"></div>

      <div className="relative max-w-3xl px-6 text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 drop-shadow-sm">
          Charity Platform
        </h1>
        <p className="mt-4 text-gray-800 text-lg md:text-xl drop-shadow-sm">
          Find verified NGOs and individuals and donate quickly and safely.
        </p>
        <div className="mt-8">
          <Link
            to="/ngos"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition"
          >
            Explore NGOs
          </Link>
        </div>
      </div>
    </div>
  )
}
