import { useNavigate } from 'react-router-dom';

const PLANS = [
  { id:'basic', name:'Basic', price:199 },
  { id:'pro', name:'Pro', price:499 },
  { id:'enterprise', name:'Enterprise', price:1499 }
];

export default function Plans(){
  const nav = useNavigate();
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Choose a plan</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PLANS.map(p => (
          <div key={p.id} className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-medium">{p.name}</h2>
            <p className="text-2xl font-bold mt-2">₹{p.price}</p>
            <button
              onClick={()=>nav(`/checkout/${p.id}`)}
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded"
            >
              Pay ₹{p.price}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
