import { useEffect, useState } from 'react';

export default function Admin(){
  const [orders, setOrders] = useState([]);
  const [payments, setPayments] = useState([]);
  const token = import.meta.env.VITE_ADMIN_TOKEN || 'admin-secret-token';

  useEffect(()=>{
    (async ()=>{
      const o = await fetch('http://localhost:5000/api/admin/orders', {
        headers: { 'x-admin-token': token }
      });
      if(o.ok) setOrders(await o.json());

      const p = await fetch('http://localhost:5000/api/admin/payments', {
        headers: { 'x-admin-token': token }
      });
      if(p.ok) setPayments(await p.json());
    })();
  },[]);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Admin</h1>

      <section className="mb-8">
        <h2 className="font-medium">Orders</h2>
        <div className="overflow-auto">
          <table className="min-w-full bg-white mt-2">
            <thead><tr className="text-left"><th>OrderId</th><th>Amount</th><th>Status</th><th>Created</th></tr></thead>
            <tbody>
              {orders.map(o=>(
                <tr key={o._id} className="border-t">
                  <td className="p-2 text-sm">{o.orderId}</td>
                  <td className="p-2 text-sm">₹{(o.amount/100).toFixed(2)}</td>
                  <td className="p-2 text-sm">{o.status}</td>
                  <td className="p-2 text-sm">{new Date(o.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="font-medium">Payments</h2>
        <div className="overflow-auto">
          <table className="min-w-full bg-white mt-2">
            <thead><tr className="text-left"><th>PaymentId</th><th>OrderId</th><th>Amount</th><th>Method</th></tr></thead>
            <tbody>
              {payments.map(p=>(
                <tr key={p._id} className="border-t">
                  <td className="p-2 text-sm">{p.paymentId}</td>
                  <td className="p-2 text-sm">{p.orderId}</td>
                  <td className="p-2 text-sm">₹{(p.amount/100).toFixed(2)}</td>
                  <td className="p-2 text-sm">{p.method}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
