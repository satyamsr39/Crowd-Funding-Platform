import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function NGOs() {
  const [ngos, setNgos] = useState([])

  // Determine the backend URL from environment or fallback
  const backendUrl = import.meta.env.VITE_APP_BACKEND_URL || 'http://localhost:5000';

  useEffect(() => {
    fetch(`${backendUrl}/api/ngos`)
      .then(res => res.json())
      .then(setNgos)
      .catch(console.error)
  }, [backendUrl])

  return (
    <div className="py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {ngos.map(n => {
        // Trim leading slashes from n.image if present
        const imagePath = n.image ? n.image.replace(/^\/+/, '') : '';

        return (
          <div key={n._id} className="bg-white rounded-lg shadow hover:shadow-lg transition p-4">
            <div className="h-40 w-full bg-gray-100 rounded overflow-hidden mb-4">
              <img
                src={
                  n.image
                    ? (n.image.startsWith('http')
                        ? n.image
                        : `${backendUrl}/uploads/${imagePath}`
                      )
                    : 'https://ashaf.org/wp-content/uploads/2020/12/PRYS1937.jpg'
                }
                alt={n.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg font-semibold">{n.name}</h3>
            <p className="text-sm text-gray-600 my-2">{n.description}</p>
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-gray-700">Collected: ₹{n.collected}</div>
              <Link to={'/ngos/' + n._id} className="bg-blue-600 text-white px-3 py-2 rounded">Donate</Link>
            </div>
          </div>
        )
      })}
    </div>
  )
}
