import React, { useEffect, useState } from 'react'

export default function AdminDashboard(){
  const [ngos, setNgos] = useState([]);
  const [loading, setLoading] = useState(false);

  async function load(){
    setLoading(true);
    try {
      const res = await fetch((import.meta.env.VITE_APP_BACKEND_URL || 'http://localhost:5000') + '/api/admin/ngos', { credentials: 'include' });
      if (!res.ok) { const d = await res.json(); alert('Unauthorized'); return; }
      const data = await res.json(); setNgos(data);
    } catch (err) { alert('Error: '+err.message) } finally { setLoading(false); }
  }

  useEffect(()=>{ load() },[]);

  async function verify(id){
    try {
      const res = await fetch((import.meta.env.VITE_APP_BACKEND_URL || 'http://localhost:5000') + '/api/admin/verify/' + id, {
        method: 'POST', credentials: 'include'
      });
      if (res.ok) {
        setNgos(ngos.map(n => n._id === id ? { ...n, verified: true } : n));
      } else {
        const d = await res.json(); alert('Error: ' + (d.message || ''));
      }
    } catch (err) { alert('Error: ' + err.message) }
  }

  return (
    <div className="py-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
        <div><button onClick={load} className="bg-blue-600 text-white px-3 py-2 rounded">{loading ? 'Loading...' : 'Reload'}</button></div>
      </div>
      <div className="space-y-4">
        {ngos.map(n => (
          <div key={n._id} className="bg-white p-4 rounded shadow flex justify-between items-start">
            <div>
              <h3 className="font-semibold">{n.name} {n.verified ? <span className="text-green-600 text-sm">Verified</span> : <span className="text-yellow-600 text-sm">Pending</span>}</h3>
              <p className="text-sm text-gray-600">{n.description}</p>
              <p className="text-sm text-gray-500 mt-2">Contact: {n.contactEmail} {n.contactNumber}</p>
            </div>
            <div>
              {!n.verified && <button onClick={()=>verify(n._id)} className="bg-green-600 text-white px-3 py-2 rounded">Verify</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}