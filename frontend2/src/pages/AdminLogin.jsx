import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AdminLogin(){
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();

  async function login(e){
    e.preventDefault();
    const res = await fetch((import.meta.env.REACT_APP_BACKEND_URL || 'http://localhost:5000') + '/api/admin/login', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: user, password: pass }), credentials: 'include'
    });
    if (res.ok) navigate('/admin');
    else { const data = await res.json(); alert('Login failed: ' + (data.message||'')); }
  }

  return (
    <div className="py-20 max-w-md mx-auto">
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Admin Login</h2>
        <form onSubmit={login} className="space-y-3">
          <input value={user} onChange={e=>setUser(e.target.value)} required placeholder="Username" className="w-full border rounded px-3 py-2" />
          <input value={pass} onChange={e=>setPass(e.target.value)} required type="password" placeholder="Password" className="w-full border rounded px-3 py-2" />
          <div className="text-right"><button className="bg-teal-600 text-white px-4 py-2 rounded">Login</button></div>
        </form>
      </div>
    </div>
  )
}