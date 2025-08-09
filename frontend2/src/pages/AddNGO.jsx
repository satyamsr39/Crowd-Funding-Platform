import React, { useState } from 'react'

export default function AddNGO(){
  const [name, setName] = useState('');
  const [type, setType] = useState('NGO');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [upi, setUpi] = useState('');
  const [goal, setGoal] = useState('');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  function onFile(e){
    const f = e.target.files[0];
    setFile(f);
    if (f) {
      const reader = new FileReader();
      reader.onload = (ev) => setPreview(ev.target.result);
      reader.readAsDataURL(f);
    } else setPreview(null);
  }

  async function submit(e){
    e.preventDefault();
    setLoading(true);
    try {
      const form = new FormData();
      form.append('name', name);
      form.append('type', type);
      form.append('description', description);
      form.append('contactEmail', email);
      form.append('contactNumber', contact);
      form.append('upi_id', upi);
      form.append('goal', goal);
      if (file) form.append('image', file);

      const res = await fetch((import.meta.env.REACT_APP_BACKEND_URL || 'http://localhost:5000') + '/api/ngos', {
        method: 'POST',
        body: form
      });
      const data = await res.json();
      if (res.ok) { alert('Submitted successfully. Pending admin verification.'); setName(''); setDescription(''); setEmail(''); setContact(''); setUpi(''); setGoal(''); setPreview(null); }
      else alert('Error: ' + (data.message || JSON.stringify(data)));
    } catch (err) { alert('Error: ' + err.message); }
    finally { setLoading(false); }
  }

  return (
    <div className="py-10 max-w-3xl mx-auto">
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Add NGO or Person</h2>
        <p className="text-gray-600 mb-4">Anyone can submit. Admin will verify entries before they appear.</p>
        <form onSubmit={submit} className="space-y-4">
          <div><input value={name} onChange={e=>setName(e.target.value)} required placeholder="Name" className="w-full border rounded px-3 py-2" /></div>
          <div>
            <select value={type} onChange={e=>setType(e.target.value)} className="w-full border rounded px-3 py-2">
              <option value="NGO">NGO</option>
              <option value="Person">Person</option>
            </select>
          </div>
          <div><textarea value={description} onChange={e=>setDescription(e.target.value)} rows="4" placeholder="Description" className="w-full border rounded px-3 py-2"></textarea></div>
          <div className="grid grid-cols-2 gap-4">
            <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Contact email" className="w-full border rounded px-3 py-2" />
            <input value={contact} onChange={e=>setContact(e.target.value)} placeholder="Contact number" className="w-full border rounded px-3 py-2" />
          </div>
          <div><input value={upi} onChange={e=>setUpi(e.target.value)} placeholder="UPI ID / Payment info" className="w-full border rounded px-3 py-2" /></div>
          <div><input value={goal} onChange={e=>setGoal(e.target.value)} type="number" placeholder="Goal amount (INR)" className="w-full border rounded px-3 py-2" /></div>
          <div>
            <label className="block text-sm mb-1">Image (optional)</label>
            <input type="file" accept="image/*" onChange={onFile} />
            {preview && <img src={preview} className="mt-2 w-48 h-28 object-cover rounded" alt="preview" />}
          </div>
          <div className="text-right"><button disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">{loading ? 'Submitting...' : 'Submit'}</button></div>
        </form>
      </div>
    </div>
  )
}