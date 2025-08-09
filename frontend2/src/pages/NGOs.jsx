import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function NGOs(){
  const [ngos, setNgos] = useState([])
  useEffect(()=>{
    fetch((import.meta.env.REACT_APP_BACKEND_URL || 'http://localhost:5000') + '/api/ngos')
      .then(r=>r.json()).then(setNgos)
  },[])
  console.log(ngos)
  return (
    <div className="py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {ngos.map(n => (
        <div key={n._id} className="bg-white rounded-lg shadow hover:shadow-lg transition p-4">
          <div className="h-40 w-full bg-gray-100 rounded overflow-hidden mb-4">
            <img src={`http://localhost:5000/uploads/${n.image}` || 'https://ashaf.org/wp-content/uploads/2020/12/PRYS1937.jpg'} alt={n.name} className="w-full h-full object-cover" />
          </div>
          <h3 className="text-lg font-semibold ">{n.name}</h3>
          <p className="text-sm text-gray-600 my-2">{n.description}</p>
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-700">Collected: ₹{n.collected}</div>
            <Link to={'/ngos/' + n._id} className="bg-blue-600 text-white px-3 py-2 rounded">Donate</Link>
          </div>
        </div>
      ))}
    </div>
  )
}