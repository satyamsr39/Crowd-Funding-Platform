import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function NGODetail(){
  const { id } = useParams();
  const [ngo, setNgo] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(()=>{
    fetch((import.meta.env.VITE_APP_BACKEND_URL || 'http://localhost:5000') + '/api/ngos/' + id)
      .then(r=>{ if(!r.ok) throw new Error('Not available'); return r.json() })
      .then(setNgo).catch(err=>setNgo({ error: err.message }))
  },[id])

  async function donate(e){
    e.preventDefault();
    const res = await fetch((import.meta.env.VITE_APP_BACKEND_URL || 'http://localhost:5000') + '/api/donations', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ngoId: id, donorName: name, donorEmail: email, amount: Number(amount) })
    });
    const data = await res.json();
    if (!res.ok) { alert('Error'); return; }
    const options = {
      key: data.keyId,
      amount: data.amount,
      currency: 'INR',
      name: ngo.name,
      order_id: data.orderId,
      handler: async (response) => {
        const verify = await fetch((import.meta.env.VITE_APP_BACKEND_URL || 'http://localhost:5000') + '/api/donations/verify', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ razorpay_order_id: response.razorpay_order_id, razorpay_payment_id: response.razorpay_payment_id, razorpay_signature: response.razorpay_signature, donationId: data.donationId })
        });
        const v = await verify.json();
        if (verify.ok) { alert('Thank you for donating!'); window.location.reload(); }
        else alert('Verification failed');
      },
      prefill: { name, email },
      theme: { color: '#0ea5a4' }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  }

  if(!ngo) return <div className="py-10">Loading...</div>;
  if (ngo.error) return <div className="py-10 text-red-600">{ngo.error}</div>;
    const backendUrl = import.meta.env.VITE_APP_BACKEND_URL || 'http://localhost:5000';


  return (
    <div className="py-10 max-w-3xl mx-auto">
      <div className="bg-white p-6 rounded shadow">
        {/* <img src={`http://localhost:5000/uploads/${ngo.image}` || 'https://via.placeholder.com/800x300?text=No+Image'} alt="" className="w-full h-60 object-cover rounded mb-4" /> */}
           <img 
  src={n.image 
    ? `${backendUrl}/uploads/${n.image}` 
    : 'https://ashaf.org/wp-content/uploads/2020/12/PRYS1937.jpg'} 
/>
        <h2 className="text-2xl font-semibold">{ngo.name}</h2>
        <p className="text-gray-600 my-2">{ngo.description}</p>
        <p className="text-sm text-gray-700 mb-4">Collected: ₹{ngo.collected} • Goal: ₹{ngo.goal}</p>
        <form onSubmit={donate} className="space-y-3">
          <div><input value={name} onChange={e=>setName(e.target.value)} required placeholder="Your name" className="w-full border rounded px-3 py-2" /></div>
          <div><input value={email} onChange={e=>setEmail(e.target.value)} required placeholder="Your email" className="w-full border rounded px-3 py-2" /></div>
          <div><input value={amount} onChange={e=>setAmount(e.target.value)} required type="number" min="1" placeholder="Amount (INR)" className="w-full border rounded px-3 py-2" /></div>
          <div className="text-right"><button className="bg-teal-600 text-white px-4 py-2 rounded">Donate</button></div>
        </form>
      </div>
    </div>
  )
}